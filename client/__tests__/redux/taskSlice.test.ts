import taskReducer, { clearSelectedTask, clearError } from "@/redux/features/tasks/taskSlice"
import { fetchTasks, addTask } from "@/redux/features/tasks/taskThunk"
import { describe, it, expect } from "@jest/globals"

describe("Task Slice", () => {
  const initialState: TaskState = {
    tasks: [],
    selectedTask: null,
    loading: "idle",
    error: null,
  }

  it("should handle initial state", () => {
    expect(taskReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should handle clearSelectedTask", () => {
    const state: TaskState = {
        ...initialState,
        selectedTask: { _id: "1", title: "Test", description: "Test", status: "pending" },
    };

    expect(taskReducer(state, clearSelectedTask())).toEqual({
      ...state,
      selectedTask: null,
    })
  })

  it("should handle clearError", () => {
    const state = {
      ...initialState,
      error: "Test error",
    }
    expect(taskReducer(state, clearError())).toEqual({
      ...state,
      error: null,
    })
  })

  it("should handle fetchTasks.pending", () => {
    expect(taskReducer(initialState, fetchTasks.pending(""))).toEqual({
      ...initialState,
      loading: "pending",
      error: null,
    })
  })

  it("should handle fetchTasks.fulfilled", () => {
    const tasks: Task[] = [
      { _id: "1", title: "Task 1", description: "Description 1", status: "pending" },
      { _id: "2", title: "Task 2", description: "Description 2", status: "completed" },
    ]
    expect(taskReducer(initialState, fetchTasks.fulfilled(tasks, ""))).toEqual({
      ...initialState,
      loading: "succeeded",
      tasks,
    })
  })

  it("should handle fetchTasks.rejected", () => {
    const error = new Error("Failed to fetch tasks")
    expect(taskReducer(initialState, fetchTasks.rejected(error, ""))).toEqual({
      ...initialState,
      loading: "failed",
      error: "Failed to fetch tasks",
    })
  })

  it("should handle addTask.fulfilled", () => {
    const newTask: Task = { _id: "3", title: "New Task", description: "New Description", status: "pending" }
    const state = { ...initialState, tasks: [] }
    expect(
      taskReducer(
        state,
        addTask.fulfilled(newTask, "", { title: "New Task", description: "New Description", status: "pending" }),
      ),
    ).toEqual({
      ...state,
      loading: "succeeded",
      tasks: [newTask],
    })
  })
})
