import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { AppModule } from '../app.module';
import { Task } from '../shared/database/entities/task.entity';
import { plainToClass } from 'class-transformer';

describe('TaskService', () => {
  let service: TaskService;
  let taskId: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const task = await service.create(
      plainToClass(Task, {
        description: 'write more code',
        dueDate: '2024-06-01',
        toDoList: 1,
      }),
    );

    expect(task).toBeDefined();
    taskId = task.id;
  });

  it('should get all todo lists', async () => {
    const tasks = await service.findAll({ toDoListId: 1, page: 1, limit: 3 });

    expect(tasks).toBeDefined();
    expect(tasks.length).toBeGreaterThan(0);
  });

  it('should get single task', async () => {
    const task = await service.findOne(taskId);

    expect(task).toBeDefined();
    expect(task).toHaveProperty('description');
    expect(task).toHaveProperty('dueDate');
    expect(task).toHaveProperty('status');
  });

  it('should update task', async () => {
    const task = await service.update(taskId, {
      description: 'new description',
    });

    expect(task).toBeDefined();
    expect(task.affected).toEqual(1);
  });

  it('should delete task list', async () => {
    const task = await service.remove(taskId);

    expect(task).toBeDefined();
    expect(task.affected).toEqual(1);
  });
});
