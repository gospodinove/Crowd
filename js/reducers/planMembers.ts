import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '../types/User'

type StateT = {
  data: Record<string, UserT[] | undefined>
}

const initialState: StateT = {
  data: {}
}

export const planMembersSlice = createSlice({
  name: 'planMembers',
  initialState,
  reducers: {
    fetch: (_, __: PayloadAction<{ planId: string; loader?: string }>) => {},
    set: (
      state,
      action: PayloadAction<{ planId: string; members: UserT[] }>
    ) => {
      state.data[action.payload.planId] = action.payload.members
    },
    update: (
      _,
      __: PayloadAction<{ planId: string; newMembers: UserT[] }>
    ) => {},
    clear: () => initialState
  }
})
