import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventT } from '../types/Event'
import { PlanDataT, PlanT } from '../types/Plan'
import { UserT } from '../types/User'

type StateT = {
  data: Record<string, PlanT | undefined>
  membersForPlanId: Record<string, UserT[] | undefined>
  eventsForPlanId: Record<string, EventT[] | undefined>
}

const initialState: StateT = {
  data: {},
  membersForPlanId: {},
  eventsForPlanId: {}
}

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    fetch: (_, __: PayloadAction<{ loader: string }>) => {},
    onFetch: (state, action: PayloadAction<Record<string, PlanT>>) => {
      state.data = action.payload
    },
    create: (_, __: PayloadAction<PlanDataT>) => {},
    onCreate: (state, action: PayloadAction<PlanT>) => {
      state.data[action.payload.id] = action.payload
    },
    fetchMembersForPlanId: (
      _,
      __: PayloadAction<{ planId: string; loader?: string }>
    ) => {},
    updateMembersForPlanId: (
      _,
      __: PayloadAction<{ planId: string; newMembers: UserT[] }>
    ) => {},
    setMembersForPlanId: (
      state,
      action: PayloadAction<{ planId: string; members: UserT[] }>
    ) => {
      const plan = state.data[action.payload.planId]

      if (!plan) {
        return
      }

      state.data[action.payload.planId] = {
        ...plan,
        userIds: action.payload.members.map(m => m.id)
      }
      state.membersForPlanId[action.payload.planId] = action.payload.members
    },
    fetchEventsForPlanId: (
      _,
      __: PayloadAction<{ planId: string; loader?: string }>
    ) => {},
    setEventsForPlanId: (
      state,
      action: PayloadAction<{ planId: string; events: EventT[] }>
    ) => {
      const plan = state.data[action.payload.planId]

      if (!plan) {
        return
      }

      state.data[action.payload.planId] = {
        ...plan,
        eventIds: action.payload.events.map(event => event.id)
      }
      state.eventsForPlanId[action.payload.planId] = action.payload.events
    },
    clear: (
      state,
      action: PayloadAction<{ clearRelatedDataOnly: boolean }>
    ) => {
      if (!action.payload.clearRelatedDataOnly) {
        return initialState
      }

      // clear only plan-related data
      state.membersForPlanId = initialState.membersForPlanId
    }
  }
})
