import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JWTGuard } from '../auth/guards/jwt-auth.guard';

@Controller('order')
@UseGuards(JWTGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req() req, @Body() createProductDto: CreateOrderDto) {
    const token = req?.headers?.authorization?.split('Bearer ')?.[1];
    return this.orderService.create(token, createProductDto);
  }

  @Post('payment')
  payment(@Req() req, @Body() createProductDto: CreatePaymentDto) {
    const token = req?.headers?.authorization?.split('Bearer ')?.[1];
    return this.orderService.payment(token, createProductDto);
  }

  @Get('me')
  findAll(@Req() req, @Query() query) {
    const token = req?.headers?.authorization?.split('Bearer ')?.[1];
    return this.orderService.findAll(token, query);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    const token = req?.headers?.authorization?.split('Bearer ')?.[1];
    return this.orderService.findOne(token, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
