import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { plansSlice } from '../reducers/plans'
import { RootState } from '../redux/store'
import { PlanDataT, PlanT } from '../types/Plan'
import api from '../utils/api'
import { createPlanLoader, plansLoader } from '../utils/loaders'

function* onFetch() {
  yield put(loadersSlice.actions.startLoader(plansLoader))

  try {
    const userId: string = yield select(
      (state: RootState) => state.user.data?.id
    )

    if (!userId) {
      throw new Error('[onFetchPlanIds] - No user id')
    }

    const documentSnapshot: FirebaseFirestoreTypes.QuerySnapshot<PlanDataT> =
      yield call(api({ type: 'fetchPlans', params: { userId } }))

    const plans: PlanT[] = documentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    plans.sort((p1, p2) => p1.startDate.seconds - p2.startDate.seconds)

    yield put(plansSlice.actions.onFetch(plans))
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(plansLoader))
  }
}

function* onCreate(action: ReturnType<typeof plansSlice.actions.create>) {
  yield put(loadersSlice.actions.startLoader(createPlanLoader))

  try {
    const documentSnapshot: FirebaseFirestoreTypes.DocumentReference<PlanDataT> =
      yield call(api({ type: 'createPlan', params: action.payload }))

    yield put(
      plansSlice.actions.onCreate({
        ...action.payload,
        id: documentSnapshot.id
      })
    )
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(createPlanLoader))
  }
}

export default function* plansSaga() {
  yield all([
    takeLatest(plansSlice.actions.fetch, onFetch),
    takeLatest(plansSlice.actions.create, onCreate)
  ])
}
