import { registerAs } from '@nestjs/config';

const appConfig = () => {
  return {
    name: process.env.APP_NAME,
    environment: process.env.APP_ENV || 'local',
    port: parseInt(process.env.PORT, 10) || 3000,
  };
};

export default registerAs('app', () => appConfig());
export const AppConfig = appConfig;
