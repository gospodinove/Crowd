import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '../types/User'

type StateT = {
  current: UserT | undefined
}

const initialState: StateT = {
  current: undefined
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
    setData: (state, action: PayloadAction<UserT>) => {
      state.current = action.payload
    },
    loadData: (_, __: PayloadAction<string>) => {},
    storeLocally: () => {},
    logout: () => {},
    onLogout: state => {
      // clear user specific data
      state.current = undefined
    }
  }
})
