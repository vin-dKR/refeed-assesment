import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { Task, TaskSchema } from "./schemas/task.schema"

@Module({
    imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
    controllers: [],
    providers: [],
})
export class TasksModule {}
