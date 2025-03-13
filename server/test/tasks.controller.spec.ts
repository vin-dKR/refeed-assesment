import { Test, type TestingModule } from "@nestjs/testing"
import { HttpException, HttpStatus } from "@nestjs/common"
import { TaskController } from "src/tasks/tasks.controller"
import { TaskService } from "src/tasks/tasks.service"
import type { CreateTaskDto } from "../src/tasks/dto/create-task.dto"
import type { UpdateTaskDto } from "../src/tasks/dto/update-task.dto"

describe("TaskController", () => {
  let controller: TaskController
  let service: TaskService

  const mockTaskService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile()

        controller = module.get<TaskController>(TaskController)
    service = module.get<TaskService>(TaskService)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  describe("create", () => {
    it("should create a task", async () => {
      const createTaskDto: CreateTaskDto = {
        title: "Test Task",
        description: "Test Description",
        status: "pending",
      }

      const expectedResult = {
        _id: "some-id",
        ...createTaskDto,
      }

      jest.spyOn(service, "create").mockResolvedValue(expectedResult as any)

      const result = await controller.create(createTaskDto)
      expect(result).toBe(expectedResult)
      expect(service.create).toHaveBeenCalledWith(createTaskDto)
    })

    it("should throw an exception if service throws an error", async () => {
      const createTaskDto: CreateTaskDto = {
        title: "Test Task",
        description: "Test Description",
        status: "pending",
      }

      jest.spyOn(service, "create").mockRejectedValue(new Error("Test error"))

      await expect(controller.create(createTaskDto)).rejects.toThrow(HttpException)
    })
  })

  describe("findAll", () => {
    it("should return an array of tasks", async () => {
      const expectedResult = [
        {
          _id: "some-id",
          title: "Test Task",
          description: "Test Description",
          status: "pending",
        },
      ]

      jest.spyOn(service, "findAll").mockResolvedValue(expectedResult as any)

      const result = await controller.findAll()
      expect(result).toBe(expectedResult)
    })

    it("should throw an exception if service throws an error", async () => {
      jest.spyOn(service, "findAll").mockRejectedValue(new Error("Test error"))

      await expect(controller.findAll()).rejects.toThrow(HttpException)
    })
  })

  describe("findOne", () => {
    it("should return a task", async () => {
      const expectedResult = {
        _id: "some-id",
        title: "Test Task",
        description: "Test Description",
        status: "pending",
      }

      jest.spyOn(service, "findOne").mockResolvedValue(expectedResult as any)

      const result = await controller.findOne("some-id")
      expect(result).toBe(expectedResult)
      expect(service.findOne).toHaveBeenCalledWith("some-id")
    })

    it("should throw a not found exception if task does not exist", async () => {
      jest.spyOn(service, "findOne").mockResolvedValue(null)

      await expect(controller.findOne("non-existent-id")).rejects.toThrow(
        new HttpException("Task not found", HttpStatus.NOT_FOUND),
      )
    })
  })

  describe("update", () => {
    it("should update a task", async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: "Updated Task",
        status: "completed",
      }

      const expectedResult = {
        _id: "some-id",
        title: "Updated Task",
        description: "Test Description",
        status: "completed",
      }

      jest.spyOn(service, "update").mockResolvedValue(expectedResult as any)

      const result = await controller.update("some-id", updateTaskDto)
      expect(result).toBe(expectedResult)
      expect(service.update).toHaveBeenCalledWith("some-id", updateTaskDto)
    })

    it("should throw a not found exception if task does not exist", async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: "Updated Task",
      }

      jest.spyOn(service, "update").mockResolvedValue(null)

      await expect(controller.update("non-existent-id", updateTaskDto)).rejects.toThrow(
        new HttpException("Task not found", HttpStatus.NOT_FOUND),
      )
    })
  })

  describe("delete", () => {
    it("should delete a task", async () => {
      jest.spyOn(service, "delete").mockResolvedValue(true)

      const result = await controller.delete("some-id")
      expect(result).toEqual({ message: "Task deleted successfully" })
      expect(service.delete).toHaveBeenCalledWith("some-id")
    })

    it("should throw a not found exception if task does not exist", async () => {
      jest.spyOn(service, "delete").mockResolvedValue(false)

      await expect(controller.delete("non-existent-id")).rejects.toThrow(
        new HttpException("Task not found", HttpStatus.NOT_FOUND),
      )
    })
  })
})
