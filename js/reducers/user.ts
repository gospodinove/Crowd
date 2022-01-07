import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '../types/User'

type StateT = {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  id: string | undefined
}

const initialState: StateT = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  id: undefined
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
    setUserData: (state, action: PayloadAction<UserT>) => {
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.id = action.payload.id
    },
    loadUserData: (_, __: PayloadAction<string>) => {},
    storeUserLocally: () => {},
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
