import { Module } from '@nestjs/common';

import { ToDoModule } from './to-do-list/to-do-list.module';
import { DatabaseModule } from './shared/database/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './shared/config/database.config';
import appConfig from './shared/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    DatabaseModule,
    ToDoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
