import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/shared/database/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { stripKeys } from 'src/shared/helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  create(user: User) {
    return this.repository.save(user);
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOneByEmail(email: string) {
    return this.repository.findOne({
      where: { email },
      relations: {
        toDoLists: true,
      },
    });
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.replyWithToken(user);
  }

  private async replyWithToken(user: User) {
    const jwtPayload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return {
      accessToken,
      user: stripKeys(user, ['password', 'deletedAt']),
    };
  }
}