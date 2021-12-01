import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlanT } from '../types/Plan'

type StateT = {
  plans: PlanT[]
}

const initialState: StateT = {
  plans: []
}

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    fetch: () => {},
    onFetch: (state, action: PayloadAction<PlanT[]>) => {
      state.plans = action.payload
    }
  }
})
