import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';
import { User } from '../shared/database/entities/user.entity';
import { stripKeys, successResponse } from '../shared/helpers';

@Controller('auth')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/register')
  async register(@Body() dto: RegisterUserDto) {
    const user = await this.service.findOneByEmail(dto.email);
    if (user) {
      throw new UnprocessableEntityException('User with email exists');
    }
    const data: User = plainToClass(User, dto);

    const newUser = await this.service.create(data);

    return successResponse(
      201,
      'Registration successful',
      stripKeys(newUser, ['password', 'deletedAt']),
    );
  }

  @Post('/login')
  async login(@Body() dto: LoginUserDto) {
    const data = await this.service.login(dto);

    return successResponse(200, 'Login successful', data);
  }
}
