import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { userSlice } from '../reducers/user'
import { RootState } from '../redux/store'
import { UserT } from '../types/User'
import api from '../utils/api'
import fetchUsers from '../utils/fetchUsers'
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

    const users: UserT[] = yield call(fetchUsers, [userCredential.user.uid])

    if (users.length !== 1) {
      throw new Error('[usersSaga onLogin]: user data does not exist')
    }

    yield call(storeUserData, users[0])

    yield put(userSlice.actions.setData(users[0]))
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

    yield put(userSlice.actions.setData(user))
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(signUpLoader))
  }
}

function* onLoadUserData(
  action: ReturnType<typeof userSlice.actions.loadData>
) {
  try {
    let user: UserT | undefined = yield call(loadUserData)

    if (user) {
      yield put(userSlice.actions.setData(user))
    } else {
      const users: UserT[] = yield call(fetchUsers, [action.payload])

      if (users.length !== 1) {
        throw new Error('[usersSaga onLoadUserData] no user data fetched')
      }

      yield put(userSlice.actions.setData(users[0]))
    }

    yield put(userSlice.actions.storeLocally())
  } catch (err) {
    console.log(err)
  }
}

function* onStoreUserLocally() {
  try {
    const userData: UserT | undefined = yield select(
      (state: RootState) => state.user.current
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
    yield put(userSlice.actions.onLogout())
  } catch (err) {
    console.log(err)
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(userSlice.actions.signUp, onSignUp),
    takeLatest(userSlice.actions.login, onLogin),
    takeLatest(userSlice.actions.loadData, onLoadUserData),
    takeLatest(userSlice.actions.storeLocally, onStoreUserLocally),
    takeLatest(userSlice.actions.logout, onLogout)
  ])
}
