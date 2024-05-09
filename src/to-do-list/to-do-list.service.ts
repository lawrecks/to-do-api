import { Injectable } from '@nestjs/common';
import { UpdateToDoDtoList } from './dto/update-to-do-list.dto';
import { ToDoList } from 'src/shared/database/entities/to-do-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationOptions } from 'src/shared/interface/pagination.interface';

@Injectable()
export class ToDoListService {
  constructor(
    @InjectRepository(ToDoList)
    private readonly repository: Repository<ToDoList>,
  ) {}
  async create(toDoList: ToDoList) {
    return this.repository.save(toDoList);
  }

  findAll({ page = 1, limit = 10 }: PaginationOptions) {
    const skip = (page - 1) * limit;
    return this.repository.find({ take: limit, skip });
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateToDoDtoList) {
    return this.repository.save({ id, ...dto });
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
