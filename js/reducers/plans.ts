import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlanDataT, PlanT } from '../types/Plan'

type StateT = Record<string, PlanT | undefined>

const initialState: StateT = {}

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    fetch: (_, __: PayloadAction<{ loader: string }>) => {},
    onFetch: (state, action: PayloadAction<Record<string, PlanT>>) => {
      state = action.payload
    },
    create: (_, __: PayloadAction<PlanDataT>) => {},
    onCreate: (state, action: PayloadAction<PlanT>) => {
      state[action.payload.id] = action.payload
    }
  }
})
