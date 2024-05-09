import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateToDoDtoList } from './dto/update-to-do-list.dto';
import { ToDoList } from '../shared/database/entities/to-do-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationOptions } from '../shared/pagination-options';

@Injectable()
export class ToDoListService {
  constructor(
    @InjectRepository(ToDoList)
    private readonly repository: Repository<ToDoList>,
  ) {}
  async create(toDoList: ToDoList) {
    return this.repository.save(toDoList);
  }

  async findAll({ page = 1, limit = 10 }: PaginationOptions) {
    const skip = (page - 1) * limit;

    return this.repository.findAndCount({
      take: limit,
      skip,
      relations: { tasks: true },
    });
  }

  async findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: { tasks: true },
    });
  }

  async update(id: number, dto: UpdateToDoDtoList) {
    return this.repository.update({ id }, dto);
  }

  async remove(id: number) {
    return this.repository.softDelete(id);
  }

  async getOne(id: number) {
    const toDoList = await this.findOne(id);
    if (!toDoList) {
      throw new NotFoundException('To-do list not found');
    }

    return toDoList;
  }
}
