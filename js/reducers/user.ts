import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StateT = {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
}

const initialState: StateT = {
  firstName: undefined,
  lastName: undefined,
  email: undefined
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
    update: (
      state,
      action: PayloadAction<{
        firstName?: string
        lastName?: string
        email?: string
      }>
    ) => {
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    }
  }
})
