import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StateT = {
  runningLoaders: Record<string, boolean>
}

const initialState: StateT = { runningLoaders: {} }

export const loadersSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    startLoader: (state, action: PayloadAction<string>) => {
      state.runningLoaders[action.payload] = true
    },
    stopLoader: (state, action: PayloadAction<string>) => {
      state.runningLoaders[action.payload] = false
    }
  }
})
