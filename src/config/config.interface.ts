export interface ConfigDBData {
  type: string;
  username: string;
  password: string;
  name: string;
  host: string;
  port: number;
  dialect: string;
  charset: string;
  collate: string;
}

export interface ConfigData {
  env: string;
  port: number;
  db?: ConfigDBData;
  /**
  @example 'verbose' 'info' 'warn' 'error'
  */
  logLevel: string;
}
