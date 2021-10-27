import { all, takeLatest } from '@redux-saga/core/effects'
import { userSlice } from '../reducers/userSlice'

function* onUpdate() {
  console.log('updated in saga')
}

export default function* userSaga() {
  yield all([takeLatest(userSlice.actions.update, onUpdate)])
}
