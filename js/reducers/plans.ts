import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlanDataT, PlanT } from '../types/Plan'

type StateT = { data: Record<string, PlanT | undefined> | undefined }

const initialState: StateT = { data: undefined }

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    sync: () => {},
    setPlan: (state, action: PayloadAction<PlanT>) => {
      if (state.data === undefined) {
        state.data = {}
      }

      state.data[action.payload.id] = action.payload
    },
    create: (_, __: PayloadAction<PlanDataT>) => {},
    onCreate: (state, action: PayloadAction<PlanT>) => {
      if (!state.data) {
        state.data = {}
      }

      state.data[action.payload.id] = action.payload
    }
  }
})
