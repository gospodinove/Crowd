import { all, call, spawn } from '@redux-saga/core/effects'
import eventsSaga from './events'
import membersSaga from './members'
import nativeSaga from './native'
import notificationsSaga from './notifications'
import plansSaga from './plans'
import searchSaga from './search'
import userSaga from './user'

export default function* rootSaga() {
  const sagas = [
    nativeSaga,
    userSaga,
    plansSaga,
    notificationsSaga,
    eventsSaga,
    membersSaga,
    searchSaga
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
