import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './shared/database/mongo/schema/users.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductSchema } from './shared/database/mongo/schema/product.schema';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI || '' ),
    MongooseModule.forFeature([{name: "users", schema: UserSchema}]),
    MongooseModule.forFeature([{name: "Product", schema: ProductSchema}]),
    ProductsModule,   // thêm ở đây
    UsersModule,      // thêm ở đây
    AuthModule,       // và AuthModule nữa
  ],
  controllers: [AppController,ProductsController],
  providers: [AppService,ProductsService]
})
export class AppModule {}
