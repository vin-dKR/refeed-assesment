import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { fetchTasks, fetchTaskById, addTask, updateTask, deleteTask } from "./taskThunk"

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


        // fetchTaskById
        builder.addCase(fetchTaskById.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })

        builder.addCase(fetchTaskById.fulfilled, (state, action: PayloadAction<Task>) => {
            state.loading = "succeeded"
            state.selectedTask = action.payload
        })

        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = "failed"
            state.error = action.error.message || "failed to fetch this task! cuz the engineer has skill issue"
        })


        // addTask
        builder.addCase(addTask.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })

        builder.addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
            state.loading = "succeeded"
            state.tasks.push(action.payload)
        })

        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = "failed"
            state.error = action.error.message || "failed to add task! engineer has some real sill issues"
        })


        // updateTask
        builder.addCase(updateTask.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })

        builder.addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
            state.loading = "succeeded"
            state.selectedTask = action.payload

            const index = state.tasks.findIndex((idx) => idx._id === action.payload._id)
            if (index !== -1) {
                state.tasks[index] = action.payload
            }
        })

        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = "failed"
            state.error = action.error.message || "failed to update the task"
        })


        // deleteTask
        builder.addCase(deleteTask.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })

        builder.addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = "succeeded"
            state.tasks = state.tasks.filter((task) => task._id !== action.payload)
            state.selectedTask = null
        })

        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = "failed"
            state.error = action.error.message || "failed to delete task! engineer has some real sill issues"
        })
    }
})

export const { clearSelectedTask, clearError } = taskSlice.actions
export default taskSlice.reducer
