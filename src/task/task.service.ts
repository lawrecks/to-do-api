import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Raw, Repository } from 'typeorm';

import { TaskQueryDto } from './dto/task-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../shared/database/entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async create(data: Task) {
    return this.repository.save(data);
  }

  async findAll({
    page,
    limit,
    status,
    toDoListId,
    search,
    dueDate,
  }: TaskQueryDto) {
    const skip = (page - 1) * limit;
    let filter: FindOptionsWhere<Task> = { toDoList: { id: toDoListId } };
    if (status) {
      filter = { ...filter, status };
    }

    if (search) {
      filter = {
        ...filter,
        description: Raw((alias) => `${alias} LIKE :search`, {
          search: `%${search}%`,
        }),
      };
    }

    if (dueDate) {
      filter = {
        ...filter,
        dueDate: Raw((alias) => `${alias} = :date`, {
          date: new Date(dueDate).toISOString().split('T')[0],
        }),
      };
    }

    return this.repository.findAndCount({
      where: filter,
      take: limit,
      skip,
      relations: { toDoList: true },
      order: {
        createdAt: 'DESC',
      },
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
