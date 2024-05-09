import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import { TaskStatusEnum } from '../../shared/constants';
import { PaginationOptions } from '../../shared/pagination-options';

export class TaskQueryDto extends PaginationOptions {
  @IsNotEmpty({ message: 'Todo List ID is required' })
  readonly toDoListId: number;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  readonly status?: TaskStatusEnum;

  @IsDateString()
  @IsOptional()
  readonly dueDate?: Date;
}
