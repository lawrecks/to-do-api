import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseModule } from 'src/shared/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/shared/database/entities/task.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
