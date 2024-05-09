import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseModule } from 'src/shared/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/shared/database/entities/task.entity';
import { ToDoListService } from 'src/to-do-list/to-do-list.service';
import { ToDoList } from 'src/shared/database/entities/to-do-list.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Task, ToDoList])],
  controllers: [TaskController],
  providers: [TaskService, ToDoListService],
})
export class TaskModule {}
