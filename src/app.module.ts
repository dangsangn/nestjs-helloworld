import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user-module/user.module';
import { TaskModule } from './task/task.module';
import { DatabaseMongoBDModule } from './database/database-mongodb.module';
import { DatabaseMySQLModule } from './database/database-mysql.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({ autoLoadEntities: true }),
    UserModule,
    TaskModule,
    DatabaseMongoBDModule,
    DatabaseMySQLModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
