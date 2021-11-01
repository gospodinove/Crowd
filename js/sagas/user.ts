import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { all, call, takeLatest } from '@redux-saga/core/effects'
import { userSlice } from '../reducers/user'
import api from '../utils/api'

function* onLogin(action: ReturnType<typeof userSlice.actions.login>) {
  try {
    yield call(
      api({
        type: 'signInWithEmailAndPassword',
        params: {
          email: action.payload.email,
          password: action.payload.password
        }
      })
    )
  } catch (err) {
    console.log(err)
  }
}

function* onSignUp(action: ReturnType<typeof userSlice.actions.signUp>) {
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
