import { fetchTasks, fetchTaskById, addTask, updateTask, deleteTask } from "@/redux/features/tasks/taskThunk";
import axios from "axios";
import { describe, expect, beforeEach, it, jest } from "@jest/globals";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

type DispatchType = ThunkDispatch<TaskState, undefined, AnyAction>;

describe("Task Thunks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchTasks", () => {
    it("should fetch tasks successfully", async () => {
      const tasks: Task[] = [
        { _id: "1", title: "Task 1", description: "Description 1", status: "pending" },
        { _id: "2", title: "Task 2", description: "Description 2", status: "in-progress" },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: tasks });

      const dispatch = jest.fn<(...args: Parameters<DispatchType>) => ReturnType<DispatchType>>();
      const thunk = fetchTasks();

      await thunk(dispatch, () => ({}), undefined);

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toBe("tasks/fetchTasks/pending");
      expect(calls[1][0].type).toBe("tasks/fetchTasks/fulfilled");
      expect(calls[1][0].payload).toEqual(tasks);
    });

    it("should handle errors when fetching tasks", async () => {
      const errorMessage = "Network Error";
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      const dispatch = jest.fn<(...args: Parameters<DispatchType>) => ReturnType<DispatchType>>();
      const thunk = fetchTasks();

      await thunk(dispatch, () => ({}), undefined);

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toBe("tasks/fetchTasks/pending");
      expect(calls[1][0].type).toBe("tasks/fetchTasks/rejected");
      expect(calls[1][0].error.message).toBe(errorMessage);
    });
  });

  // ... other describe blocks (update dispatch similarly)
  describe("fetchTaskById", () => {
    it("should fetch a task by id successfully", async () => {
      const task: Task = { _id: "1", title: "Task 1", description: "Description 1", status: "pending" };

      mockedAxios.get.mockResolvedValueOnce({ data: task });

      const dispatch = jest.fn<(...args: Parameters<DispatchType>) => ReturnType<DispatchType>>();
      const thunk = fetchTaskById("1");

      await thunk(dispatch, () => ({}), undefined);

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toBe("tasks/fetchTaskById/pending");
      expect(calls[1][0].type).toBe("tasks/fetchTaskById/fulfilled");
      expect(calls[1][0].payload).toEqual(task);
    });
  });

  describe("addTask", () => {
    it("should add a task successfully", async () => {
      const newTask = { title: "New Task", description: "New Description", status: "pending" as const };
      const createdTask: Task = { _id: "3", ...newTask };

      mockedAxios.post.mockResolvedValueOnce({ data: createdTask });

      const dispatch = jest.fn<(...args: Parameters<DispatchType>) => ReturnType<DispatchType>>();
      const thunk = addTask(newTask);

      await thunk(dispatch, () => ({}), undefined);

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toBe("tasks/addTask/pending");
      expect(calls[1][0].type).toBe("tasks/addTask/fulfilled");
      expect(calls[1][0].payload).toEqual(createdTask);
    });
  });

  describe("updateTask", () => {
    it("should update a task successfully", async () => {
      const taskUpdate = { id: "1", title: "Updated Task", description: "Updated Description", status: "completed" as const };
      const updatedTask: Task = { _id: "1", title: "Updated Task", description: "Updated Description", status: "completed" };

      mockedAxios.put.mockResolvedValueOnce({ data: updatedTask });

      const dispatch = jest.fn<(...args: Parameters<DispatchType>) => ReturnType<DispatchType>>();
      const thunk = updateTask(taskUpdate);

      await thunk(dispatch, () => ({}), undefined);

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toBe("tasks/updateTask/pending");
      expect(calls[1][0].type).toBe("tasks/updateTask/fulfilled");
      expect(calls[1][0].payload).toEqual(updatedTask);
    });
  });

  describe("deleteTask", () => {
    it("should delete a task successfully", async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      const dispatch = jest.fn<(...args: Parameters<DispatchType>) => ReturnType<DispatchType>>();
      const thunk = deleteTask("1");

      await thunk(dispatch, () => ({}), undefined);

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toBe("tasks/deleteTask/pending");
      expect(calls[1][0].type).toBe("tasks/deleteTask/fulfilled");
      expect(calls[1][0].payload).toBe("1");
    });
  });
});
