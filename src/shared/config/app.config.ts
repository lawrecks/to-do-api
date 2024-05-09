import { registerAs } from '@nestjs/config';

const appConfig = () => {
  return {
    name: process.env.APP_NAME,
    environment: process.env.APP_ENV || 'local',
    port: parseInt(process.env.PORT, 10) || 3000,
    tokenExpiresIn: 60 * 60 * 24, // 1 day,
    jwtSecret: process.env.JWT_SECRET || 'secret',
  };
};

export default registerAs('app', () => appConfig());
export const AppConfig = appConfig;
