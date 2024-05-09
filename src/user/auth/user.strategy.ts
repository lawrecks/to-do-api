import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { stripKeys } from '../..//shared/helpers';
import { User } from '../../shared/database/entities/user.entity';
import { UserService } from '../user.service';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('app.jwtSecret'),
    });
  }

  async validate(payload: any) {
    const { email } = payload;

    const user: User = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return stripKeys(user, ['password', 'deletedAt']);
  }
}
