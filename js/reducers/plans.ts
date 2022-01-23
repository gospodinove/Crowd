import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlanDataT, PlanT } from '../types/Plan'

type StateT = {
  data: PlanT[]
}

const initialState: StateT = {
  data: []
}

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    fetch: () => {},
    onFetch: (state, action: PayloadAction<PlanT[]>) => {
      state.data = action.payload
    },
    create: (_, __: PayloadAction<PlanDataT>) => {},
    onCreate: (state, action: PayloadAction<PlanT>) => {
      state.data.push(action.payload)
    }
  }
})
