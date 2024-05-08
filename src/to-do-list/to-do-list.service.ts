import { Injectable } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do-list.dto';
import { UpdateToDoDto } from './dto/update-to-do-list.dto';

@Injectable()
export class ToDoService {
  create(createToDoDto: CreateToDoDto) {
    return 'This action adds a new toDo';
  }

  findAll() {
    return `This action returns all toDo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} toDo`;
  }

  update(id: number, updateToDoDto: UpdateToDoDto) {
    return `This action updates a #${id} toDo`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDo`;
  }
}
