import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as dotenv from 'dotenv';

const configFactory = {
  provide: ConfigService,
  useFactory: () => {
    dotenv.config;
    const config = new ConfigService();
    config.loadFromDotEnv();
    return config;
  },
};
@Module({
  imports: [ConfigService],
  controllers: [],
  providers: [configFactory],
  exports: [ConfigService],
})
export class ConfigModule {}
