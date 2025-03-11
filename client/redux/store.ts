import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        // WIP: import TaskSlice feature and use the task state.
        tasks: xyz,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
