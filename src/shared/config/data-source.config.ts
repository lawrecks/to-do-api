import 'dotenv/config';
import * as mysqlDriver from 'mysql2';
import { DataSourceOptions } from 'typeorm';

export function getDataSourceConfig() {
  return {
    driver: mysqlDriver,
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    entities: [__dirname + '/../database/entities/*.entity.{ts,js}'],
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: 'utf8mb4',
    migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
  } as DataSourceOptions;
}
