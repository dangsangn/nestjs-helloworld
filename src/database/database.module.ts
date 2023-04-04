// import { ConfigService } from './../config/config.service';
// import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { Module, DynamicModule } from '@nestjs/common';
// import { ConfigModule } from 'src/config/config.module';
// import { ConfigData } from 'src/config/config.interface';
// import { ConfigDBData } from 'src/config/config.interface';

// @Module({
//   imports: [ConfigModule],
//   controllers: [],
//   providers: [],
// })
// export class DatabaseModule {
//   public static forRoot(dbConfig: DbConfig): DynamicModule {
//     return {
//       module: DatabaseModule,
//       imports: [
//         TypeOrmModule.forRootAsync({
//           imports: [ConfigModule],
//           useFactory: (configService: ConfigService) => {
//             return DatabaseModule.getConnection(configService);
//           },
//         }),
//       ],
//     };
//   }

//   static getConnection(configService: ConfigService) {
//     const dbData = configService.get().db;
//     let connectionOptions: TypeOrmModuleOptions;
//     if (dbData) {
//       return this.getMySqlDBConfig(dbData);
//     }
//   }
//   static getMySqlDBConfig(dbData: ConfigDBData): TypeOrmModuleOptions {
//     return {
//       type: dbData.type,
//     };
//   }
// }
