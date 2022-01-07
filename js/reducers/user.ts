import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '../types/User'

type StateT = {
  data: UserT | undefined
}

const initialState: StateT = {
  data: undefined
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
      state.data = action.payload
    },
    loadUserData: (_, __: PayloadAction<string>) => {},
    storeUserLocally: () => {},
    logout: () => {},
    onLogout: state => {
      // clear user specific data
      state.data = undefined
    }
  }
})
