import { IsNotEmpty } from 'class-validator';

export class CreateToDoListDto {
  @IsNotEmpty()
  readonly user_id: number;

  @IsNotEmpty()
  readonly name: string;
}
