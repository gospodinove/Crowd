import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlanDataT, PlanT } from '../types/Plan'
import { UserT } from '../types/User'

/**
 * store the big pieces of data as Records
 * this way we don't have to rerender the connected components on every update
 */
type StateT = {
  basicInfo: Record<string, PlanT>
  members: Record<string, UserT[]>
}

const initialState: StateT = {
  basicInfo: {},
  members: {}
}

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    fetch: () => {},
    onFetch: (state, action: PayloadAction<Record<string, PlanT>>) => {
      state.basicInfo = action.payload
    },
    create: (_, __: PayloadAction<PlanDataT>) => {},
    onCreate: (state, action: PayloadAction<PlanT>) => {
      state.basicInfo[action.payload.id] = action.payload
    },
    updateMembers: (
      _,
      __: PayloadAction<{ planId: string; newUserIds: string[] }>
    ) => {},
    onMembersUpdate: (
      state,
      action: PayloadAction<{ planId: string; newUserIds: string[] }>
    ) => {
      const plan = state.basicInfo[action.payload.planId]

      state.basicInfo[action.payload.planId] = {
        ...plan,
        userIds: [...new Set([...plan.userIds, ...action.payload.newUserIds])]
      }
    }
  }
})
