import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { eventsSlice } from '../reducers/events'
import { loadersSlice } from '../reducers/loaders'
import { RootState } from '../redux/store'
import { EventDataT, EventT } from '../types/Event'
import api from '../utils/api'
import { fetchPlanEventsLoader } from '../utils/loaders'

function* onFetch(action: ReturnType<typeof eventsSlice.actions.fetch>) {
  const loader = action.payload.loader ?? fetchPlanEventsLoader

  yield put(loadersSlice.actions.startLoader(loader))

  try {
    const eventIds: string[] | undefined = yield select(
      (state: RootState) => state.plans.data[action.payload.planId]?.eventIds
    )

    if (!eventIds) {
      throw new Error('[eventsSaga onFetchMembersForPlanId] - no event IDs')
    }

    const snapshot: FirebaseFirestoreTypes.QuerySnapshot<EventDataT> =
      yield call(api({ type: 'fetchEvents', params: { eventIds } }))

    const events: EventT[] = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))

    yield put(
      eventsSlice.actions.setEvents({
        planId: action.payload.planId,
        events
      })
    )
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(loader))
  }
}

export default function* eventsSaga() {
  yield all([takeLatest(eventsSlice.actions.fetch, onFetch)])
}
