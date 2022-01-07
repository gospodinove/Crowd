import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { userSlice } from '../reducers/user'
import { RootState } from '../redux/store'
import { UserDataT, UserT } from '../types/User'
import api from '../utils/api'
import { loginLoader, signUpLoader } from '../utils/loaders'
import { loadUserData, storeUserData } from '../utils/localData'

function* onLogin(action: ReturnType<typeof userSlice.actions.login>) {
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

    yield put(userSlice.actions.setUserData(user))
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(loginLoader))
  }
}

function* onSignUp(action: ReturnType<typeof userSlice.actions.signUp>) {
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

    yield put(userSlice.actions.setUserData(user))
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
  action: ReturnType<typeof userSlice.actions.loadUserData>
) {
  try {
    let userData: UserT | undefined = yield call(loadUserData)

    if (userData) {
      yield put(userSlice.actions.setUserData(userData))
    } else {
      userData = yield call(fetchUserData, action.payload)

      if (!userData) {
        throw new Error('[onLoadUserData] no user data fetched')
      }

      yield put(userSlice.actions.setUserData(userData))
    }

    yield put(userSlice.actions.storeUserLocally())
  } catch (err) {
    console.log(err)
  }
}

function* onStoreUserLocally() {
  try {
    const userData: UserT = yield select((state: RootState) => state.user.data)

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
    yield put(userSlice.actions.onLogout())
  } catch (err) {
    console.log(err)
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(userSlice.actions.signUp, onSignUp),
    takeLatest(userSlice.actions.login, onLogin),
    takeLatest(userSlice.actions.loadUserData, onLoadUserData),
    takeLatest(userSlice.actions.storeUserLocally, onStoreUserLocally),
    takeLatest(userSlice.actions.logout, onLogout)
  ])
}
