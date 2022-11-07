import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { CreateOrderDto } from './order.dto';
import { Order } from './order.schema';

@Injectable()
export class OrderService {
    constructor(@InjectModel('order') 
        private readonly orderModel: Model<Order>
    ) {}
    async create(createOrderDto: CreateOrderDto) : Promise<Order> {
        const newOrder = new this.orderModel(createOrderDto);
        await newOrder.save()
        return newOrder
    }
}
