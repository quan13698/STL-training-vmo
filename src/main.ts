import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  await app.listen(3000, () => {
  //   const connectDB = async () => {
  //     try {
  //         await mongoose.connect('mongodb://localhost:27017/order-application');
  //         console.log('DB connected');
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };
  // connectDB();

  });
}
bootstrap();
