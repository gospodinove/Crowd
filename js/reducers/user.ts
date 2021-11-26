import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '../types/User'

type StateT = {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  planIds: string[]
}

const initialState: StateT = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  planIds: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (_, __: PayloadAction<{ email: string; password: string }>) => {},
    signUp: (
      _,
      __: PayloadAction<{
        firstName: string
        lastName: string
        email: string
        password: string
      }>
    ) => {},
    storeUser: (state, action: PayloadAction<UserT>) => {
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.planIds = action.payload.planIds
    },
    update: (
      state,
      action: PayloadAction<{
        firstName: string | undefined
        lastName: string | undefined
        email: string | undefined
      }>
    ) => {
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    }
  }
})
