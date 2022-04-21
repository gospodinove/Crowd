import { all, call, spawn } from '@redux-saga/core/effects'
import eventsSaga from './events'
import nativeSaga from './native'
import notificationsSaga from './notifications'
import planMembersSaga from './planMembers'
import plansSaga from './plans'
import usersSaga from './users'

export default function* rootSaga() {
  const sagas = [
    nativeSaga,
    usersSaga,
    plansSaga,
    notificationsSaga,
    eventsSaga,
    planMembersSaga
  ]

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (err) {
            console.log(err)
          }
        }
      })
    )
  )
}
