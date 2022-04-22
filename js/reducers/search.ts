import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '../types/User'

type StateT = {
  members: UserT[]
}

const initialState: StateT = {
  members: []
}

type SearchDomainT = 'members'

type SearchQueryT = { domain: SearchDomainT; query: string }

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    search: (_, __: PayloadAction<SearchQueryT>) => {},
    setMemberResults: (state, action: PayloadAction<UserT[]>) => {
      state.members = action.payload
    }
  }
})
