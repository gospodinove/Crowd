import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import {
  all,
  call,
  put,
  select,
  take,
  takeLatest
} from '@redux-saga/core/effects'
import { EventChannel, eventChannel } from 'redux-saga'
import { loadersSlice } from '../reducers/loaders'
import { plansSlice } from '../reducers/plans'
import { RootState } from '../redux/store'
import { PlanDataT, PlanT } from '../types/Plan'
import api from '../utils/api'
import { generatePlanQuery } from '../utils/firebase'
import { createPlanLoader } from '../utils/loaders'

function* planWatcher(channel: EventChannel<any>) {
  while (true) {
    const document: FirebaseFirestoreTypes.DocumentSnapshot<PlanDataT> =
      yield take(channel)

    const plandData = document.data()

    if (!plandData) {
      continue
    }

    const plan: PlanT = {
      ...plandData,
      id: document.id
    }

    yield put(plansSlice.actions.setPlan(plan))
  }
}

function* onFetch(action: ReturnType<typeof plansSlice.actions.fetch>) {
  yield put(loadersSlice.actions.startLoader(action.payload.loader))

  try {
    const planIds: string[] | undefined = yield select(
      (state: RootState) => state.user.current?.planIds
    )

    if (!planIds) {
      throw new Error('[plansSaga onFetch] - No plan IDs')
    }

    const planChannels = planIds.map(id =>
      eventChannel(emit => generatePlanQuery(id).onSnapshot(emit))
    )

    yield all(planChannels.map(channel => call(planWatcher, channel)))
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(action.payload.loader))
  }
}

function* onCreate(action: ReturnType<typeof plansSlice.actions.create>) {
  yield put(loadersSlice.actions.startLoader(createPlanLoader))

  try {
    const documentReference: FirebaseFirestoreTypes.DocumentReference<PlanDataT> =
      yield call(api({ type: 'createPlan', params: action.payload }))

    yield put(
      plansSlice.actions.onCreate({
        ...action.payload,
        id: documentReference.id
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
