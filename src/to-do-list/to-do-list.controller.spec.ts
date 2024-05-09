import { Test, TestingModule } from '@nestjs/testing';
import { ToDoListController } from './to-do-list.controller';
import { ToDoListService } from './to-do-list.service';

describe('ToDoController', () => {
  let controller: ToDoListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoListController],
      providers: [ToDoListService],
    }).compile();

    controller = module.get<ToDoListController>(ToDoListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
