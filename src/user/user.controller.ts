import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { plainToClass } from 'class-transformer';
import { User } from 'src/shared/database/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { stripKeys, successResponse } from 'src/shared/helpers';

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

    return successResponse(201, stripKeys(newUser, ['password']));
  }

  @Post('/login')
  async login(@Body() dto: LoginUserDto) {
    const data = await this.service.login(dto);

    return successResponse(200, data);
  }
}
