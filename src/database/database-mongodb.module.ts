import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB, {
      useNewUrlParser: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseMongoBDModule {}
