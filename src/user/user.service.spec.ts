import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { UserService } from './user.service';
import { AppModule } from '../app.module';
import { User } from '../shared/database/entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let userEmail: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create(
      plainToClass(User, {
        firstName: 'john',
        lastName: 'doe',
        email: 'john@doe.com',
        password: 'password',
      }),
    );

    expect(user).toBeDefined();

    userEmail = user.email;
  });

  it('should find a user', async () => {
    const user = await service.findOneByEmail(userEmail);

    expect(user).toBeDefined();
  });
});
