import { Test, TestingModule } from '@nestjs/testing';
import { ToDoController } from './to-do-list.controller';
import { ToDoService } from './to-do-list.service';

describe('ToDoController', () => {
  let controller: ToDoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoController],
      providers: [ToDoService],
    }).compile();

    controller = module.get<ToDoController>(ToDoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
