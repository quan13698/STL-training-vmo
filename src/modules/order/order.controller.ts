import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDto } from './order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor( private readonly orderService: OrderService){}

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        return await this.orderService.create(createOrderDto)
    }

    @Get()
    getOrder(){
        return 'get order'
    }
}
