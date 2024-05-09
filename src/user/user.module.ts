import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserStrategy } from './auth/user.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../shared/database/database.module';
import { User } from '../shared/database/entities/user.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('app.jwtSecret'),
        signOptions: {
          expiresIn: configService.get('app.tokenExpiresIn'),
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserStrategy],
})
export class UserModule {}
