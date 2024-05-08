import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          name: 'default',
          type: 'mysql',
          host: configService.get('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get('database.user'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          charset: configService.get('database.charset'),
          entities,
          autoLoadEntities: true,
          legacySpatialSupport: configService.get(
            'database.legacySpatialSupport',
          ),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
