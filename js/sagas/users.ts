import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { usersSlice } from '../reducers/users'
import { RootState } from '../redux/store'
import { PlanT } from '../types/Plan'
import { UserDataT, UserT } from '../types/User'
import api from '../utils/api'
import fetchUsers from '../utils/fetchUsers'
import {
  fetchPlanMembersLoader,
  inviteMembersSearchLoader,
  loginLoader,
  signUpLoader,
  updatePlanMembersLoader
} from '../utils/loaders'
import { loadUserData, storeUserData } from '../utils/localData'

function* onLogin(action: ReturnType<typeof usersSlice.actions.login>) {
  yield put(loadersSlice.actions.startLoader(loginLoader))

  try {
    const userCredential: FirebaseAuthTypes.UserCredential = yield call(
      api({
        type: 'signInWithEmailAndPassword',
        params: {
          email: action.payload.email,
          password: action.payload.password
        }
      })
    )

    const users: UserT[] = yield call(fetchUsers, [userCredential.user.uid])

    if (users.length !== 1) {
      throw new Error('[usersSaga onLogin]: user data does not exist')
    }

    yield call(storeUserData, users[0])

    yield put(usersSlice.actions.setUserData(users[0]))
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(loginLoader))
  }
}

function* onSignUp(action: ReturnType<typeof usersSlice.actions.signUp>) {
  yield put(loadersSlice.actions.startLoader(signUpLoader))

  try {
    // create the authentication credential
    const newUser: FirebaseAuthTypes.UserCredential = yield call(
      api({
        type: 'createUserWithEmailAndPassword',
        params: {
          email: action.payload.email,
          password: action.payload.password
        }
      })
    )

    // create the user database object
    yield call(
      api({
        type: 'addUser',
        params: {
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          uid: newUser.user.uid
        }
      })
    )

    const user: UserT = {
      email: action.payload.email,
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      id: newUser.user.uid
    }

    yield call(storeUserData, user)

    yield put(usersSlice.actions.setUserData(user))
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(signUpLoader))
  }
}

function* onLoadUserData(
  action: ReturnType<typeof usersSlice.actions.loadUserData>
) {
  try {
    let user: UserT | undefined = yield call(loadUserData)

    if (user) {
      yield put(usersSlice.actions.setUserData(user))
    } else {
      const users: UserT[] = yield call(fetchUsers, [action.payload])

      if (users.length !== 1) {
        throw new Error('[usersSaga onLoadUserData] no user data fetched')
      }

      yield put(usersSlice.actions.setUserData(users[0]))
    }

    yield put(usersSlice.actions.storeUserLocally())
  } catch (err) {
    console.log(err)
  }
}

function* onStoreUserLocally() {
  try {
    const userData: UserT | undefined = yield select(
      (state: RootState) => state.users.currentUser
    )

    if (!userData) {
      return
    }

    yield call(storeUserData, userData)
  } catch (err) {
    console.log(err)
  }
}

function* onLogout() {
  try {
    yield call(api({ type: 'logout', params: undefined }))
    yield put(usersSlice.actions.onLogout())
  } catch (err) {
    console.log(err)
  }
}

function* onSearch(action: ReturnType<typeof usersSlice.actions.search>) {
  yield put(loadersSlice.actions.startLoader(inviteMembersSearchLoader))

  try {
    if (action.payload.length === 0) {
      yield put(usersSlice.actions.setSearchResults([]))
      return
    }

    const rawResults: FirebaseFirestoreTypes.QuerySnapshot<UserDataT> =
      yield call(
        api({ type: 'searchUsers', params: { email: action.payload } })
      )

    const result: UserT[] = rawResults.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    yield put(usersSlice.actions.setSearchResults(result))
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(inviteMembersSearchLoader))
  }
}

function* onFetchPlanMembers(
  action: ReturnType<typeof usersSlice.actions.fetchPlanMembers>
) {
  const loader = action.payload.loader ?? fetchPlanMembersLoader

  yield put(loadersSlice.actions.startLoader(loader))

  try {
    const memberIds: string[] | undefined = yield select(
      (state: RootState) => state.plans.data[action.payload.planId]?.userIds
    )

    if (!memberIds) {
      throw new Error('[usersSaga onFetchPlanMembers] - no member IDs')
    }

    const members: UserT[] = yield call(fetchUsers, memberIds)

    yield put(
      usersSlice.actions.setPlanMembers({
        planId: action.payload.planId,
        members
      })
    )
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(loader))
  }
}

function* onUpdatePlanMembers(
  action: ReturnType<typeof usersSlice.actions.updatePlanMembers>
) {
  yield put(loadersSlice.actions.startLoader(updatePlanMembersLoader))

  try {
    const {
      plan,
      oldMembers
    }: { plan: PlanT | undefined; oldMembers: UserT[] | undefined } =
      yield select((state: RootState) => ({
        plan: state.plans.data[action.payload.planId],
        oldMembers: state.users.planMembers[action.payload.planId]
      }))

    if (!plan) {
      throw new Error('[plansSaga onUpdateMembersForPlanId] - no plan')
    }

    // use Set to remove the duplicated values
    yield call(
      api({
        type: 'setPlanMembers',
        params: {
          planId: plan.id,
          userIds: [
            ...new Set([
              ...action.payload.newMembers.map(m => m.id),
              ...plan.userIds
            ])
          ]
        }
      })
    )

    // create the notifications for each new member
    yield call(
      api({
        type: 'createNotificationBatch',
        params: {
          userIds: action.payload.newMembers.map(m => m.id),
          title: `Added to ${plan.name}`,
          message: 'You have been added to a new plan',
          isRead: false,
          image: {
            type: 'plan',
            value: 'test'
          }
        }
      })
    )

    yield put(
      usersSlice.actions.setPlanMembers({
        planId: action.payload.planId,
        members: [
          ...new Set([...action.payload.newMembers, ...(oldMembers ?? [])])
        ]
      })
    )
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(updatePlanMembersLoader))
  }
}

export default function* usersSaga() {
  yield all([
    takeLatest(usersSlice.actions.signUp, onSignUp),
    takeLatest(usersSlice.actions.login, onLogin),
    takeLatest(usersSlice.actions.loadUserData, onLoadUserData),
    takeLatest(usersSlice.actions.storeUserLocally, onStoreUserLocally),
    takeLatest(usersSlice.actions.logout, onLogout),
    takeLatest(usersSlice.actions.search, onSearch),
    takeLatest(usersSlice.actions.fetchPlanMembers, onFetchPlanMembers),
    takeLatest(usersSlice.actions.updatePlanMembers, onUpdatePlanMembers)
  ])
}
