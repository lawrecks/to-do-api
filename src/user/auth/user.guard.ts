import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err, user, info: Error) {
    if (err || !user || info) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
