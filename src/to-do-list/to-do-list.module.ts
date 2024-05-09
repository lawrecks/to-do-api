import { Module } from '@nestjs/common';
import { ToDoService } from './to-do-list.service';
import { ToDoController } from './to-do-list.controller';

@Module({
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
