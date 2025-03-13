"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { thunk } from "redux-thunk"
import TaskBoard from "../components/reusables/tasksPlayground/TaskBoard"
import {expect, jest } from '@jest/globals';

// Mock the components that are used in TaskBoard
jest.mock("../components/reusables/tasksPlayground/TaskColumn.tsx", () => {
  return function MockTaskColumn({ title, tasks, onTaskClick, onEditClick }: TaskColumnProps) {
    return (
      <div data-testid={`column-${title}`}>
        <h3>{title}</h3>
        <div>
          {tasks.map((task) => (
            <div key={task._id} data-testid={`task-${task._id}`} onClick={() => onTaskClick(task)}>
              {task.title}
              <button data-testid={`edit-${task._id}`} onClick={() => onEditClick(task)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
})

jest.mock("../components/reusables/tasksPopups/TaskDetailModal", () => {
  return function MockTaskDetailModal({ task, isOpen, onClose, onEditClick }: TaskDetailModalProps) {
    if (!isOpen) return null
    return (
      <div data-testid="task-detail-modal">
        <h2>{task.title}</h2>
        <button data-testid="close-detail-modal" onClick={onClose}>
          Close
        </button>
        <button data-testid={`edit-${task._id}`} onClick={() => onEditClick(task)}>
          Edit
        </button>
      </div>
    )
  }
})

jest.mock("../components/reusables/tasksPopups/TaskFormModal", () => {
  return function MockTaskFormModal({ task, isOpen, onClose }: TaskFormModalProps) {
    if (!isOpen) return null
    return (
      <div data-testid="task-form-modal">
        <h2>{task ? "Edit Task" : "New Task"}</h2>
        <button data-testid="close-form-modal" onClick={onClose}>
          Close
        </button>
      </div>
    )
  }
})

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe("TaskBoard Component", () => {
  let store: any 

  const tasks = [
    { _id: "1", title: "Task 1", description: "Description 1", status: "pending" },
    { _id: "2", title: "Task 2", description: "Description 2", status: "in-progress" },
    { _id: "3", title: "Task 3", description: "Description 3", status: "completed" },
  ]

  beforeEach(() => {
    store = mockStore({
      tasks: {
        tasks,
        loading: "idle",
        error: null,
      },
    })

    store.dispatch = jest.fn()
  })

  it("renders the task board with columns", () => {
    render(
      <Provider store={store}>
        <TaskBoard />
      </Provider>,
    )

    expect(screen.getByTestId("column-To Do")).toBeInTheDocument()
    expect(screen.getByTestId("column-In Progress")).toBeInTheDocument()
    expect(screen.getByTestId("column-Completed")).toBeInTheDocument()
  })

  it("opens task detail modal when clicking on a task", () => {
    render(
      <Provider store={store}>
        <TaskBoard />
      </Provider>,
    )

    fireEvent.click(screen.getByTestId("task-1"))
    expect(screen.getByTestId("task-detail-modal")).toBeInTheDocument()
    expect(screen.getByText("Task 1")).toBeInTheDocument()
  })

  it("opens task form modal when clicking on New Task button", () => {
    render(
      <Provider store={store}>
        <TaskBoard />
      </Provider>,
    )

    fireEvent.click(screen.getByText("New Task"))
    expect(screen.getByTestId("task-form-modal")).toBeInTheDocument()
    expect(screen.getByText("New Task")).toBeInTheDocument()
  })

  it("opens task form modal for editing when clicking edit button", () => {
    render(
      <Provider store={store}>
        <TaskBoard />
      </Provider>,
    )

    fireEvent.click(screen.getByText("Task 1"));
    expect(screen.getByTestId("task-detail-modal")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("edit-from-modal"));
    expect(screen.queryByTestId("task-detail-modal")).not.toBeInTheDocument();
    expect(screen.getByText("Edit ")).toBeInTheDocument();
  })

  it("closes task detail modal when clicking close button", () => {
    render(
      <Provider store={store}>
        <TaskBoard />
      </Provider>,
    )

    fireEvent.click(screen.getByTestId("task-1"))
    expect(screen.getByTestId("task-detail-modal")).toBeInTheDocument()

    fireEvent.click(screen.getByTestId("close-detail-modal"))
    expect(screen.queryByTestId("task-detail-modal")).not.toBeInTheDocument()
  })

})
