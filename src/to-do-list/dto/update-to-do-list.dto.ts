import { PartialType } from '@nestjs/mapped-types';
import { CreateToDoDto } from './create-to-do-list.dto';

export class UpdateToDoDto extends PartialType(CreateToDoDto) {}
