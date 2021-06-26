import { configureStore } from '@reduxjs/toolkit'
import { dogReducer } from '../features/dog/dogSlice';

export const store = configureStore({
  reducer: {
    dogs: dogReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch