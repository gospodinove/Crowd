import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlanDataT, PlanT } from '../types/Plan'

type StateT = Record<string, PlanT>

const initialState: StateT = {}

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    fetch: () => {},
    onFetch: (_, action: PayloadAction<Record<string, PlanT>>) =>
      action.payload,
    create: (_, __: PayloadAction<PlanDataT>) => {},
    onCreate: (state, action: PayloadAction<PlanT>) => {
      state[action.payload.id] = action.payload
    },
    updateMembers: (
      _,
      __: PayloadAction<{ planId: string; newUserIds: string[] }>
    ) => {},
    onMembersUpdate: (
      state,
      action: PayloadAction<{ planId: string; newUserIds: string[] }>
    ) => {
      const plan = state[action.payload.planId]

      state[action.payload.planId] = {
        ...plan,
        userIds: [...new Set([...plan.userIds, ...action.payload.newUserIds])]
      }
    }
  }
})
