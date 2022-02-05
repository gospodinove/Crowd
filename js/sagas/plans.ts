import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { plansSlice } from '../reducers/plans'
import { RootState } from '../redux/store'
import { PlanDataT, PlanT } from '../types/Plan'
import { UserT } from '../types/User'
import api from '../utils/api'
import fetchUsers from '../utils/fetchUsers'
import {
  createPlanLoader,
  fetchPlanMembersLoader,
  plansLoader,
  updatePlanMembersLoader
} from '../utils/loaders'

function* onFetch() {
  yield put(loadersSlice.actions.startLoader(plansLoader))

  try {
    const userId: string | undefined = yield select(
      (state: RootState) => state.users.currentUser?.id
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
      throw new Error('[onUpdateMembersForPlanId] - no plan')
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
      throw new Error('[onFetchMembersForPlanId] - no member IDs')
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
    )
  ])
}
