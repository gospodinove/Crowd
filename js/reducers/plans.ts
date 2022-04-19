import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlanDataT, PlanT } from '../types/Plan'

type StateT = { data: Record<string, PlanT | undefined> }

const initialState: StateT = { data: {} }

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
    }
  }
})
