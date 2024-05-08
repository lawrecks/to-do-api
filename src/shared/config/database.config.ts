import { registerAs } from '@nestjs/config';

const dbConfig = () => {
  return {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    prefix: process.env.DB_PREFIX,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
  };
};

export default registerAs('database', () => dbConfig());
export const DBConfig = dbConfig;
