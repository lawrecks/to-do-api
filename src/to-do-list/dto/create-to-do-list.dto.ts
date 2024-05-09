import { IsNotEmpty } from 'class-validator';

export class CreateToDoListDto {
  @IsNotEmpty()
  readonly name: string;
}
