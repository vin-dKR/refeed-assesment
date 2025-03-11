import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = process.env.NEXT_PUBILC_URL || "http://localhost:8000"

// Fetch All Task:
export const fetchTasks = createAsyncThunk<Task[]>("tasks/fetchTasks", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}/task`)
        console.log(res.data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            return rejectWithValue(e.response?.data?.message || e.message)
        }
        return rejectWithValue("an unknown error occured when fetching all tasks!")
    }
})


// Fetch Task By Id
// WIP: fetchTaskById-
// WIP: updateTask-
// WIP: deleteTask-
