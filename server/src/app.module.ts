import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { TasksModule } from './tasks/tasks.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://usevinodkr:SlQ1CZzJv9MTeeiI@refeeddb.1zlqv.mongodb.net/?retryWrites=true&w=majority&appName=refeeddb'),
        TasksModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
