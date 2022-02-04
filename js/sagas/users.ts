import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { usersSlice } from '../reducers/users'
import { RootState } from '../redux/store'
import { UserDataT, UserT } from '../types/User'
import api from '../utils/api'
import {
  inviteMembersSearch,
  loginLoader,
  signUpLoader
} from '../utils/loaders'
import { loadUserData, storeUserData } from '../utils/localData'

// Helpers
function* fetchUsers(userIds: string[]) {
  try {
    const documentSnapshot: FirebaseFirestoreTypes.QuerySnapshot<UserDataT[]> =
      yield call(
        api({
          type: 'fetchUsers',
          params: { userIds }
        })
      )

    return documentSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  } catch (err) {
    console.log(err)
  }
}

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
      throw new Error('[onLogin]: user data does not exist')
    }

    yield call(storeUserData, users[0])

    yield put(usersSlice.actions.setUserData(users[0]))
    yield put(usersSlice.actions.cacheUsers(users))
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
        throw new Error('[onLoadUserData] no user data fetched')
      }

      yield put(usersSlice.actions.setUserData(users[0]))
      yield put(usersSlice.actions.cacheUsers(users))
    }

    yield put(usersSlice.actions.storeUserLocally())
  } catch (err) {
    console.log(err)
  }
}

function* onStoreUserLocally() {
  try {
    const userData: UserT = yield select(
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
  yield put(loadersSlice.actions.startLoader(inviteMembersSearch))

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
    yield put(loadersSlice.actions.stopLoader(inviteMembersSearch))
  }
}

function* onFetchUsers(
  action: ReturnType<typeof usersSlice.actions.fetchUsers>
) {
  try {
    const loadedUserIds: string[] = yield select((state: RootState) =>
      Object.keys(state.users.users)
    )

    const unloadedUserIds = action.payload.filter(
      id => !loadedUserIds.includes(id)
    )

    if (unloadedUserIds.length === 0) {
      return
    }

    const users: UserT[] = yield call(fetchUsers, unloadedUserIds)

    yield put(usersSlice.actions.cacheUsers(users))
  } catch (err) {
    console.log(err)
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(usersSlice.actions.signUp, onSignUp),
    takeLatest(usersSlice.actions.login, onLogin),
    takeLatest(usersSlice.actions.loadUserData, onLoadUserData),
    takeLatest(usersSlice.actions.storeUserLocally, onStoreUserLocally),
    takeLatest(usersSlice.actions.logout, onLogout),
    takeLatest(usersSlice.actions.search, onSearch),
    takeLatest(usersSlice.actions.fetchUsers, onFetchUsers)
  ])
}
