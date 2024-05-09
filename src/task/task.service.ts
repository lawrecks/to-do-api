import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'src/shared/database/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationOptions } from 'src/shared/pagination-options';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}
  async create(data: Task) {
    return this.repository.save(data);
  }

  async findAll(
    toDoListId: number,
    { page = 1, limit = 10 }: PaginationOptions,
  ) {
    const skip = (page - 1) * limit;
    return this.repository.findAndCount({
      where: { toDoList: { id: toDoListId } },
      take: limit,
      skip,
      relations: { toDoList: true },
    });
  }

  async findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: { toDoList: true },
    });
  }

  async update(id: number, dto: UpdateTaskDto) {
    return this.repository.update({ id }, dto);
  }

  async remove(id: number) {
    return this.repository.softDelete(id);
  }

  async getOne(id: number) {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}
