import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '../types/User'

type StateT = {
  currentUser: UserT | undefined
  searchResults: UserT[]
  planMembers: Record<string, UserT[] | undefined>
}

const initialState: StateT = {
  currentUser: undefined,
  searchResults: [],
  planMembers: {}
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
    fetchPlanMembers: (
      _,
      __: PayloadAction<{ planId: string; loader?: string }>
    ) => {},
    setPlanMembers: (
      state,
      action: PayloadAction<{ planId: string; members: UserT[] }>
    ) => {
      state.planMembers[action.payload.planId] = action.payload.members
    },
    updatePlanMembers: (
      _,
      __: PayloadAction<{ planId: string; newMembers: UserT[] }>
    ) => {},
    clearPlanMembers: state => {
      state.planMembers = {}
    }
  }
})
