import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '../types/User'

type StateT = {
  currentUser: UserT | undefined
  searchResults: UserT[]
  membersByPlanId: Record<string, UserT[] | undefined>
}

const initialState: StateT = {
  currentUser: undefined,
  searchResults: [],
  membersByPlanId: {}
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
    setMembersForPlanId: (
      state,
      action: PayloadAction<{ planId: string; members: UserT[] }>
    ) => {
      state.membersByPlanId[action.payload.planId] = action.payload.members
    }
  }
})
