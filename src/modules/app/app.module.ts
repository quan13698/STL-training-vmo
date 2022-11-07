import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { OrderController } from '../order/order.controller';
import { OrderSchema, ORDER_SCHEMA_NAME } from '../order/order.schema';
import { OrderService } from '../order/order.service';
import { UserSchema, USER_SCHEMA_NAME } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/order-application'),
  MongooseModule.forFeature([{ name: ORDER_SCHEMA_NAME, schema: OrderSchema }]),
  MongooseModule.forFeature([{ name: USER_SCHEMA_NAME, schema: UserSchema}])
  ],
  controllers: [AppController, OrderController, AuthController],
  providers: [AppService, OrderService, AuthService, UserService],
})
export class AppModule { }
