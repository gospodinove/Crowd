import { all, takeLatest } from '@redux-saga/core/effects'
import { notificationsSlice } from '../reducers/notifications'

function* onFetch() {}

export default function* plansSaga() {
  yield all([takeLatest(notificationsSlice.actions.fetch, onFetch)])
}
