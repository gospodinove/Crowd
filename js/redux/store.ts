import createSagaMiddleware from '@redux-saga/core'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { eventsSlice } from '../reducers/events'
import { loadersSlice } from '../reducers/loaders'
import { membersSlice } from '../reducers/members'
import { nativeSlice } from '../reducers/native'
import { notificationsSlice } from '../reducers/notifications'
import { plansSlice } from '../reducers/plans'
import { searchSlice } from '../reducers/search'
import { userSlice } from '../reducers/user'
import rootSaga from '../sagas/root'

export const slices = {
  native: nativeSlice,
  user: userSlice,
  loaders: loadersSlice,
  plans: plansSlice,
  notifications: notificationsSlice,
  events: eventsSlice,
  members: membersSlice,
  search: searchSlice
}

const reducers: { [K in keyof typeof slices]: typeof slices[K]['reducer'] } =
  Object.values(slices).reduce((acc, slice) => {
    acc[slice.name] = slice.reducer
    return acc
  }, {} as any)

export const reducer = combineReducers(reducers)

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
