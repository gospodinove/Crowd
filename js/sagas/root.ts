import { all, call, spawn } from '@redux-saga/core/effects'
import plansSaga from './plans'
import userSaga from './user'

export default function* rootSaga() {
  const sagas = [userSaga, plansSaga]

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
