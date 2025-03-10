import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Task } from "./schemas/task.schema"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"


@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const createTask = new this.taskModel(createTaskDto)
        return createTask.save();
    }

    async findAll(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async findOne(id: string): Promise<Task | null> {
        return this.taskModel.findById(id).exec();
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
        return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    }

    async delete(id: string): Promise<any> {
        return this.taskModel.findByIdAndDelete(id).exec();
    }
}
