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

    const documentSnapshot: FirebaseFirestoreTypes.DocumentSnapshot<UserDataT> =
      yield call(
        api({
          type: 'fetchUserData',
          params: { uid: userCredential.user.uid }
        })
      )

    const userData = documentSnapshot.data()

    if (!userData) {
      throw new Error('[onLogin]: user data does not exist')
    }

    const user: UserT = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      id: documentSnapshot.id
    }

    yield call(storeUserData, user)

    yield put(usersSlice.actions.setUserData(user))
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

function* fetchUserData(userId: string) {
  try {
    const documentSnapshot: FirebaseFirestoreTypes.DocumentSnapshot<UserDataT> =
      yield call(
        api({
          type: 'fetchUserData',
          params: { uid: userId }
        })
      )

    const userData = documentSnapshot.data()

    if (!userData) {
      throw new Error('[fetchUserData] no user data fetched')
    }

    return {
      ...userData,
      id: userId
    }
  } catch (err) {
    console.log(err)
  }
}

function* onLoadUserData(
  action: ReturnType<typeof usersSlice.actions.loadUserData>
) {
  try {
    let userData: UserT | undefined = yield call(loadUserData)

    if (userData) {
      yield put(usersSlice.actions.setUserData(userData))
    } else {
      userData = yield call(fetchUserData, action.payload)

      if (!userData) {
        throw new Error('[onLoadUserData] no user data fetched')
      }

      yield put(usersSlice.actions.setUserData(userData))
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
    const rawResults: FirebaseFirestoreTypes.QuerySnapshot<UserDataT> =
      yield call(
        api({ type: 'searchUsers', params: { email: action.payload } })
      )

    const result: UserT[] = rawResults.docs.map(doc => {
      const data = doc.data()

      return {
        id: doc.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      }
    })

    yield put(usersSlice.actions.setSearchResults(result))
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(inviteMembersSearch))
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(usersSlice.actions.signUp, onSignUp),
    takeLatest(usersSlice.actions.login, onLogin),
    takeLatest(usersSlice.actions.loadUserData, onLoadUserData),
    takeLatest(usersSlice.actions.storeUserLocally, onStoreUserLocally),
    takeLatest(usersSlice.actions.logout, onLogout),
    takeLatest(usersSlice.actions.search, onSearch)
  ])
}
