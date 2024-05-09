import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateToDoDtoList } from './dto/update-to-do-list.dto';
import { ToDoList } from '../shared/database/entities/to-do-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Raw, Repository } from 'typeorm';
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

  async findAll({ page, limit, search }: PaginationOptions) {
    const skip = (page - 1) * limit;
    let options: FindManyOptions<ToDoList> = {
      take: limit,
      skip,
      relations: { tasks: true },
      order: {
        createdAt: 'DESC',
      },
    };

    if (search) {
      options = {
        ...options,
        where: {
          name: Raw((alias) => `${alias} LIKE :search`, {
            search: `%${search}%`,
          }),
        },
      };
    }

    console.log('options :>> ', options);

    return this.repository.findAndCount(options);
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
