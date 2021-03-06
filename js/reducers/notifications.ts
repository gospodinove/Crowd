import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationT } from '../types/Notification'

type StateT = NotificationT[]

const initialState: StateT = []

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    fetch: (_, __: PayloadAction<{ loader: string }>) => {},
    set: (_, action: PayloadAction<NotificationT[]>) => action.payload
  }
})
