import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseMongoBDModule } from './database/database-mongodb.module';
import { DatabaseMySQLModule } from './database/database-mysql.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user-module/user.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({ autoLoadEntities: true }),
    UserModule,
    TaskModule,
    DatabaseMongoBDModule,
    DatabaseMySQLModule,
    AuthModule,
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
