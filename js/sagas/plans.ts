import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { plansSlice } from '../reducers/plans'
import { RootState } from '../redux/store'
import { PlanT } from '../types/Plan'
import api from '../utils/api'
import { plansLoader } from '../utils/loaders'

function* onFetch() {
  yield put(loadersSlice.actions.startLoader(plansLoader))

  const planIds: string[] = yield select(
    (state: RootState) => state.user.planIds
  )

  try {
    const documentSnapshot: FirebaseFirestoreTypes.QuerySnapshot<PlanT> =
      yield call(api({ type: 'fetchPlans', params: { planIds } }))

    const plans = documentSnapshot.docs.map(doc => doc.data())

    yield put(plansSlice.actions.onFetch(plans))
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(plansLoader))
  }
}

export default function* plansSaga() {
  yield all([takeLatest(plansSlice.actions.fetch, onFetch)])
}
