import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { plansSlice } from '../reducers/plans'
import { RootState } from '../redux/store'
import { EventDataT, EventT } from '../types/Event'
import { PlanDataT, PlanT } from '../types/Plan'
import { UserT } from '../types/User'
import api from '../utils/api'
import fetchUsers from '../utils/fetchUsers'
import {
  createPlanLoader,
  fetchPlanEventsLoader,
  fetchPlanMembersLoader,
  updatePlanMembersLoader
} from '../utils/loaders'

function* onFetch(action: ReturnType<typeof plansSlice.actions.fetch>) {
  yield put(loadersSlice.actions.startLoader(action.payload.loader))

  try {
    const userId: string | undefined = yield select(
      (state: RootState) => state.users.currentUser?.id
    )

    if (!userId) {
      throw new Error('[plansSaga onFetchPlanIds] - No user id')
    }

    const documentSnapshot: FirebaseFirestoreTypes.QuerySnapshot<PlanDataT> =
      yield call(api({ type: 'fetchPlans', params: { userId } }))

    const plans: PlanT[] = documentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    yield put(
      plansSlice.actions.onFetch(
        plans.reduce(
          (result, item) => ((result[item.id] = item), result),
          {} as Record<string, PlanT>
        )
      )
    )
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(action.payload.loader))
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

function* onUpdateMembersForPlanId(
  action: ReturnType<typeof plansSlice.actions.updateMembersForPlanId>
) {
  yield put(loadersSlice.actions.startLoader(updatePlanMembersLoader))

  try {
    const {
      plan,
      oldMembers
    }: { plan: PlanT | undefined; oldMembers: UserT[] | undefined } =
      yield select((state: RootState) => ({
        plan: state.plans.data[action.payload.planId],
        oldMembers: state.plans.membersForPlanId[action.payload.planId]
      }))

    if (!plan) {
      throw new Error('[plansSaga onUpdateMembersForPlanId] - no plan')
    }

    // use Set to remove the duplicated values
    yield call(
      api({
        type: 'setPlanMembers',
        params: {
          planId: plan.id,
          userIds: [
            ...new Set([
              ...action.payload.newMembers.map(m => m.id),
              ...plan.userIds
            ])
          ]
        }
      })
    )

    // create the notifications for each new member
    yield call(
      api({
        type: 'createNotificationBatch',
        params: {
          userIds: action.payload.newMembers.map(m => m.id),
          title: `Added to ${plan.name}`,
          message: 'You have been added to a new plan',
          isRead: false,
          image: {
            type: 'plan',
            value: 'test'
          }
        }
      })
    )

    yield put(
      plansSlice.actions.setMembersForPlanId({
        planId: action.payload.planId,
        members: [
          ...new Set([...action.payload.newMembers, ...(oldMembers ?? [])])
        ]
      })
    )
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(updatePlanMembersLoader))
  }
}

function* onFetchMembersForPlanId(
  action: ReturnType<typeof plansSlice.actions.fetchMembersForPlanId>
) {
  const loader = action.payload.loader ?? fetchPlanMembersLoader

  yield put(loadersSlice.actions.startLoader(loader))

  try {
    const memberIds: string[] | undefined = yield select(
      (state: RootState) => state.plans.data[action.payload.planId]?.userIds
    )

    if (!memberIds) {
      throw new Error('[plansSaga onFetchMembersForPlanId] - no member IDs')
    }

    const members: UserT[] = yield call(fetchUsers, memberIds)

    yield put(
      plansSlice.actions.setMembersForPlanId({
        planId: action.payload.planId,
        members
      })
    )
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(loader))
  }
}

function* onFetchEventsForPlanId(
  action: ReturnType<typeof plansSlice.actions.fetchMembersForPlanId>
) {
  const loader = action.payload.loader ?? fetchPlanEventsLoader

  yield put(loadersSlice.actions.startLoader(loader))

  try {
    const eventIds: string[] | undefined = yield select(
      (state: RootState) => state.plans.data[action.payload.planId]?.eventIds
    )

    if (!eventIds) {
      throw new Error('[plansSaga onFetchMembersForPlanId] - no event IDs')
    }

    const snapshot: FirebaseFirestoreTypes.QuerySnapshot<EventDataT> =
      yield call(api({ type: 'fetchEvents', params: { eventIds } }))

    const events: EventT[] = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))

    yield put(
      plansSlice.actions.setEventsForPlanId({
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

export default function* plansSaga() {
  yield all([
    takeLatest(plansSlice.actions.fetch, onFetch),
    takeLatest(plansSlice.actions.create, onCreate),
    takeLatest(
      plansSlice.actions.updateMembersForPlanId,
      onUpdateMembersForPlanId
    ),
    takeLatest(
      plansSlice.actions.fetchMembersForPlanId,
      onFetchMembersForPlanId
    ),
    takeLatest(plansSlice.actions.fetchEventsForPlanId, onFetchEventsForPlanId)
  ])
}
