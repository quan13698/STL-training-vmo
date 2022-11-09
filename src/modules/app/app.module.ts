import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { OrderController } from '../order/order.controller';
import { OrderSchema, ORDER_SCHEMA_NAME } from '../order/order.schema';
import { OrderService } from '../order/order.service';
import { UserSchema, USER_SCHEMA_NAME } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/order-application'),
    MongooseModule.forFeature([{ name: ORDER_SCHEMA_NAME, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: USER_SCHEMA_NAME, schema: UserSchema}]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {expiresIn: '5s'}
    }) 
  ],
  controllers: [AppController, OrderController, AuthController],
  providers: [AppService, OrderService, AuthService, UserService, JwtStrategy],
})
export class AppModule { }
