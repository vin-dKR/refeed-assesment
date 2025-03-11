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


// Fetch Task By fetchTaskById-
export const fetchTaskById = createAsyncThunk<Task>("tasks/fetchTaskById", async (id, { rejectWithValue }) => {
    try{
        const res = await axios.get(`${API_URL}/task/${id}`)
        return res.data
    } catch(e) {
        if (axios.isAxiosError(e)) {
            return rejectWithValue(e.response?.data?.message || e.message)
        }
        return rejectWithValue("an unknown error occured when fetching this task!")
    }
})


// Add new tasks
export const addTask = createAsyncThunk<Task, { title: string; description: string; status: string }>(
    "tasks/addTask", 
    async (taskData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/task`, taskData)
            return res.data
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.response?.data?.message || e.message)
            }
            return rejectWithValue("an unknown error occured when adding this task!")
        }
    }
)

// Update Task
export const updateTask = createAsyncThunk<Task, {id: string; title: string; description: string; status: string}>(
    "tasks/updateTask", 
    async ({ id, ...taskData }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API_URL}/task/${id}`, taskData)
            return res.data
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.response?.data?.message || e.message)
            }
            return rejectWithValue("an unknown error occured when updating this task!")
        }
    }
)


// Delete Task
export const deleteTask = createAsyncThunk<string, string>("tasks/deleteTask", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/task/${id}`)
        return id
    } catch (e) {
        if (axios.isAxiosError(e)) {
            return rejectWithValue(e.response?.data?.message || e.message)
        }
        return rejectWithValue("an unknown error occured when deleting this task!")
    }
})
