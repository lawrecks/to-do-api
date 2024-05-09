import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateToDoListDto } from './create-to-do-list.dto';

export class UpdateToDoDtoList extends PartialType(
  OmitType(CreateToDoListDto, ['user_id']),
) {}
