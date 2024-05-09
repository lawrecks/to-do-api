import { Module } from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { ToDoListController } from './to-do-list.controller';
import { DatabaseModule } from '../shared/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoList } from '../shared/database/entities/to-do-list.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([ToDoList])],
  controllers: [ToDoListController],
  providers: [ToDoListService],
})
export class ToDoListModule {}
