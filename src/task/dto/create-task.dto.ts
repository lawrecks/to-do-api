import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Todo List ID is required' })
  readonly toDoListId: number;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly dueDate: Date;
}
