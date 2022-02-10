import { createSlice } from '@reduxjs/toolkit'
import { Notification } from '../types/Notification'

type StateT = Notification[]

const initialState: StateT = []

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    fetch: () => {}
  }
})
