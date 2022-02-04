import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { plansSlice } from '../reducers/plans'
import { RootState } from '../redux/store'
import { PlanDataT, PlanT } from '../types/Plan'
import api from '../utils/api'
import { createPlanLoader, plansLoader, setPlanMembers } from '../utils/loaders'

function* onFetch() {
  yield put(loadersSlice.actions.startLoader(plansLoader))

  try {
    const userId: string = yield select(
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

function* onUpdateMembers(
  action: ReturnType<typeof plansSlice.actions.updateMembers>
) {
  yield put(loadersSlice.actions.startLoader(setPlanMembers))

  try {
    const plan: PlanT = yield select(
      (state: RootState) => state.plans.basicInfo[action.payload.planId]
    )

    // use Set to remove the duplicated values
    yield call(
      api({
        type: 'setPlanMembers',
        params: {
          planId: plan.id,
          userIds: [...new Set([...action.payload.newUserIds, ...plan.userIds])]
        }
      })
    )

    // create the notifications for each new member
    yield call(
      api({
        type: 'createNotificationBatch',
        params: {
          userIds: action.payload.newUserIds,
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

    yield put(plansSlice.actions.onMembersUpdate(action.payload))
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(setPlanMembers))
  }
}

export default function* plansSaga() {
  yield all([
    takeLatest(plansSlice.actions.fetch, onFetch),
    takeLatest(plansSlice.actions.create, onCreate),
    takeLatest(plansSlice.actions.updateMembers, onUpdateMembers)
  ])
}
