import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './shared/database/mongo/schema/users.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI || '' ),
    MongooseModule.forFeature([{name: "users", schema: UserSchema}]),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
