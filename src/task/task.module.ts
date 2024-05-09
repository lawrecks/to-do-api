import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseModule } from '../shared/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../shared/database/entities/task.entity';
import { ToDoListService } from '../to-do-list/to-do-list.service';
import { ToDoList } from '../shared/database/entities/to-do-list.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Task, ToDoList])],
  controllers: [TaskController],
  providers: [TaskService, ToDoListService],
})
export class TaskModule {}
