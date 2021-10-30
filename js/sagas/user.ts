import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { all, call, takeLatest } from '@redux-saga/core/effects'
import { userSlice } from '../reducers/user'

function* onLogin(action: ReturnType<typeof userSlice.actions.login>) {
  try {
    yield call(() =>
      auth().signInWithEmailAndPassword(
        action.payload.email,
        action.payload.password
      )
    )
  } catch (err) {
    console.log(err)
  }
}

function* onSignUp(action: ReturnType<typeof userSlice.actions.signUp>) {
  try {
    // create the authentication credential
    const newUser: FirebaseAuthTypes.UserCredential = yield call(() =>
      auth().createUserWithEmailAndPassword(
        action.payload.email,
        action.payload.password
      )
    )

    // create the user database object
    yield call(() =>
      firestore().collection('users').add({
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        uuid: newUser.user.uid
      })
    )
  } catch (err) {
    console.log(err)
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
