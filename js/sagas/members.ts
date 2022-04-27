import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { membersSlice } from '../reducers/members'
import { PlanT } from '../types/Plan'
import { RootState } from '../types/RootState'
import { UserT } from '../types/User'
import api from '../utils/api'
import fetchUsers from '../utils/fetchUsers'
import {
  fetchPlanMembersLoader,
  updatePlanMembersLoader
} from '../utils/loaders'

function* onFetch(action: ReturnType<typeof membersSlice.actions.fetch>) {
  const loader = action.payload.loader ?? fetchPlanMembersLoader

  yield put(loadersSlice.actions.startLoader(loader))

  try {
    const memberIds: string[] | undefined = yield select(
      (state: RootState) => state.plans.data?.[action.payload.planId]?.userIds
    )

    if (!memberIds) {
      throw new Error('[usersSaga onFetchPlanMembers] - no member IDs')
    }

    const members: UserT[] = yield call(fetchUsers, memberIds)

    yield put(
      membersSlice.actions.set({
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

function* onUpdate(action: ReturnType<typeof membersSlice.actions.update>) {
  yield put(loadersSlice.actions.startLoader(updatePlanMembersLoader))

  try {
    const {
      plan,
      oldMembers
    }: { plan: PlanT | undefined; oldMembers: UserT[] | undefined } =
      yield select((state: RootState) => ({
        plan: state.plans.data?.[action.payload.planId],
        oldMembers: state.planMembers.data[action.payload.planId]
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
      membersSlice.actions.set({
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

export default function* membersSaga() {
  yield all([
    takeLatest(membersSlice.actions.fetch, onFetch),
    takeLatest(membersSlice.actions.update, onUpdate)
  ])
}
