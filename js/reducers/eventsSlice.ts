import { createSlice } from '@reduxjs/toolkit'
import { EventT } from '../types/Event'

type StateT = EventT[]

const initialState: StateT = []

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {}
})
