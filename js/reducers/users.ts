import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '../types/User'

type StateT = {
  currentUser: UserT | undefined
  searchResults: UserT[]
  users: Record<string, UserT>
}

const initialState: StateT = {
  currentUser: undefined,
  searchResults: [],
  users: {}
}

export const usersSlice = createSlice({
  name: 'users',
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
      state.currentUser = action.payload
    },
    loadUserData: (_, __: PayloadAction<string>) => {},
    storeUserLocally: () => {},
    logout: () => {},
    onLogout: state => {
      // clear user specific data
      state.currentUser = undefined
    },
    search: (_, __: PayloadAction<string>) => {},
    setSearchResults: (state, action: PayloadAction<UserT[]>) => {
      state.searchResults = action.payload
    },
    // fetch only those users that are not already cached
    fetchUsers: (_, __: PayloadAction<string[]>) => {}
  }
})
