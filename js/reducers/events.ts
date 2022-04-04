import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventT } from '../types/Event'

// plan id -> events
type StateT = Record<string, EventT[] | undefined>

const initialState: StateT = {}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetch: (_, __: PayloadAction<{ planId: string; loader?: string }>) => {},
    setEvents: (
      state,
      action: PayloadAction<{ planId: string; events: EventT[] }>
    ) => {
      state[action.payload.planId] = action.payload.events
    },
    clear: () => initialState
  }
})
