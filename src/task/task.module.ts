import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DatabaseModule } from '../shared/database/database.module';
import { Task } from '../shared/database/entities/task.entity';
import { ToDoList } from '../shared/database/entities/to-do-list.entity';
import { ToDoListService } from '../to-do-list/to-do-list.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Task, ToDoList])],
  controllers: [TaskController],
  providers: [TaskService, ToDoListService],
})
export class TaskModule {}
