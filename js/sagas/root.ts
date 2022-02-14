import { all, call, spawn } from '@redux-saga/core/effects'
import nativeSaga from './native'
import notificationsSaga from './notifications'
import plansSaga from './plans'
import usersSaga from './users'

export default function* rootSaga() {
  const sagas = [nativeSaga, usersSaga, plansSaga, notificationsSaga]

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
