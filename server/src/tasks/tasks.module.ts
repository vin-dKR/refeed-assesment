import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { Task, TaskSchema } from "./schemas/task.schema"
import { TaskController } from "./tasks.controller"
import { TaskService } from "./tasks.service"

@Module({
    imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TasksModule {}
