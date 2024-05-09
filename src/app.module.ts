import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './shared/config/app.config';
import databaseConfig from './shared/config/database.config';
import { DatabaseModule } from './shared/database/database.module';
import { TaskModule } from './task/task.module';
import { ToDoListModule } from './to-do-list/to-do-list.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    DatabaseModule,
    ToDoListModule,
    UserModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
