import { Get, Post, Put, Delete, Param, Body, NotFoundException, Controller } from "@nestjs/common"
import { TaskService } from "./tasks.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"
import { Task } from "./schemas/task.schema"

@Controller('task')
export class TaskController {
    constructor(private readonly taskService:TaskService) {}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(createTaskDto);
    }

    @Get()
    findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Task> {
        const task = await this.taskService.findOne(id);

        if(!task) {
            throw new NotFoundException(`Task with ${id} not found!`);
        }
        return task;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskService.update(id, updateTaskDto);

        if (!task) {
            throw new NotFoundException(`Task with ${id} not found!`);
        }
        return task;
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{message: string}> {
        const task = await this.taskService.delete(id);

        if (!task) {
            throw new NotFoundException(`Task with ${id} not found!`);
        }
        
        return {
            message: "Task deleted successfully"
        };
    }
}
