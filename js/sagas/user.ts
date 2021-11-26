import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { userSlice } from '../reducers/user'
import { UserDataT } from '../types/User'
import api from '../utils/api'
import { loginLoader, signUpLoader } from '../utils/loaders'

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
        api({ type: 'fetchUser', params: { uid: userCredential.user.uid } })
      )

    const userData = documentSnapshot.data()

    if (!userData) {
      throw new Error('[onLogin]: user data does not exist')
    }

    yield put(
      userSlice.actions.storeUser({ ...userData, email: action.payload.email })
    )
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
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          uid: newUser.user.uid
        }
      })
    )

    yield put(
      userSlice.actions.storeUser({
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        planIds: []
      })
    )
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(signUpLoader))
  }
}

function* onUpdate() {
  console.log('updated in saga')
}

export default function* userSaga() {
  yield all([
    takeLatest(userSlice.actions.signUp, onSignUp),
    takeLatest(userSlice.actions.login, onLogin),
    takeLatest(userSlice.actions.update, onUpdate)
  ])
}
