import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor( private readonly orderService: OrderService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        return await this.orderService.create(createOrderDto)
    }

    @Get()
    getOrder(){
        return 'get order'
    }
}
