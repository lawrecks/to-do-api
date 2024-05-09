import { IsNotEmpty } from 'class-validator';
import { PaginationOptions } from '../../shared/pagination-options';

export class TaskQueryDto extends PaginationOptions {
  @IsNotEmpty({ message: 'Todo List ID is required' })
  readonly toDoListId: number;
}
