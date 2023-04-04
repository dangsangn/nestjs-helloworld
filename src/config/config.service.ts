import { CONFIG_DEFAULT } from './config.default';
import { Injectable } from '@nestjs/common';
import { ConfigData, ConfigDBData } from './config.interface';

@Injectable()
export class ConfigService {
  private config: ConfigData;
  constructor(config: ConfigData = CONFIG_DEFAULT) {
    this.config = config;
  }

  loadFromDotEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.environment || CONFIG_DEFAULT.env,
      port: parseInt(env.PORT) || CONFIG_DEFAULT.port,
      db: this.parseDBConfigFromEnv(env) || CONFIG_DEFAULT.db,
      logLevel: env.logLevel || CONFIG_DEFAULT.logLevel,
    };
  }

  parseDBConfigFromEnv(env: NodeJS.ProcessEnv): ConfigDBData {
    return {
      type: env.type || '',
      username: env.username || '',
      password: env.password || '',
      name: env.name || '',
      host: env.host || '',
      port: parseInt(env.port),
      dialect: env.dialect || '',
      charset: env.charset || '',
      collate: env.collate || '',
    };
  }
}
