import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/shared/database/entities/user.entity';
import { stripKeys } from 'src/shared/helpers';

@Injectable()
export class StaffStrategy extends PassportStrategy(Strategy, 'staff') {
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
