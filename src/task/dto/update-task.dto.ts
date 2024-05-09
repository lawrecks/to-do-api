import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatusEnum } from '../../shared/constants';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(TaskStatusEnum)
  @IsOptional()
  readonly status?: TaskStatusEnum;
}
