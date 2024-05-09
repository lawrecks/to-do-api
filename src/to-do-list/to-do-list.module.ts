import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ToDoListController } from './to-do-list.controller';
import { ToDoListService } from './to-do-list.service';
import { DatabaseModule } from '../shared/database/database.module';
import { ToDoList } from '../shared/database/entities/to-do-list.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([ToDoList])],
  controllers: [ToDoListController],
  providers: [ToDoListService],
})
export class ToDoListModule {}
