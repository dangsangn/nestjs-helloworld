import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user-module/user.module';
import { TaskModule } from './task/task.module';
import { DatabaseMongoBDModule } from './database/database-mongodb.module';

@Module({
  imports: [UserModule, TaskModule, DatabaseMongoBDModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
