import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from './reducers/userSlice'

export const slices = {
  user: userSlice
}

const reducers: { [K in keyof typeof slices]: typeof slices[K]['reducer'] } =
  Object.values(slices).reduce((acc, slice) => {
    acc[slice.name] = slice.reducer
    return acc
  }, {} as any)

export const reducer = combineReducers(reducers)

const store = configureStore({
  reducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
