import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { ToDoListService } from './to-do-list.service';
import { AppModule } from '../app.module';
import { ToDoList } from '../shared/database/entities/to-do-list.entity';

describe('ToDoListService', () => {
  let service: ToDoListService;
  let todoId: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<ToDoListService>(ToDoListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo list', async () => {
    const todo = await service.create(
      plainToClass(ToDoList, {
        name: 'work',
        user: 1,
      }),
    );

    expect(todo).toBeDefined();
    todoId = todo.id;
  });

  it('should get all todo lists', async () => {
    const todo = await service.findAll({ page: 1, limit: 3 });

    expect(todo).toBeDefined();
    expect(todo.length).toBeGreaterThan(0);
  });

  it('should get single todo list', async () => {
    const todo = await service.findOne(todoId);

    expect(todo).toBeDefined();
    expect(todo).toHaveProperty('name');
  });

  it('should update todo list', async () => {
    const todo = await service.update(todoId, { name: 'new name' });

    expect(todo).toBeDefined();
    expect(todo.affected).toEqual(1);
  });

  it('should delete todo list', async () => {
    const todo = await service.remove(todoId);

    expect(todo).toBeDefined();
    expect(todo.affected).toEqual(1);
  });
});
