import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { fetchTasks } from "./taskThunk"

const initialState: TaskState = {
    tasks: [],
    selectedTask: null,
    loading: "idle",
    error: null
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        clearSelectedTask: (state) => {
            state.selectedTask = null
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // fetchTaskss
        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })

        builder.addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
            state.loading = "succeeded"
            state.tasks = action.payload
        })

        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = "failed"
            state.error = action.error.message || "failed to fetch all the tasks! cuz the engineer has skill issue"
        })
    }
})

export const { clearSelectedTask, clearError } = taskSlice.actions
export default taskSlice.reducer
