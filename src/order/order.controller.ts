import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  Request,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ProductService } from 'src/product/product.service';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  private async asyncEvery(arr: any, func: any) {
    for (let e of arr) {
      if (!(await func(e))) return false;
    }

    return true;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data, @Request() req) {
    try {
      const products = [...data.details];

      const checkQuantity = await this.asyncEvery(products, async (e) => {
        const product = await this.productService.findOne(e._id);
        return product.quantityInStock >= e.quantity;
      });

      let err = false;
      if (!checkQuantity) {
        err = true;
      } else {
        products.forEach(async (value, i) => {
          const product = await this.productService.findOne(value._id);
          const newQuantity = product.quantityInStock - value.quantity;
          await this.productService.update(value._id, {
            quantityInStock: newQuantity,
          });
        });
      }

      if (err) throw new NotAcceptableException();

      data.user = req.user._id;
      const result = await this.orderService.create(data);

      return { data: result };
    } catch (error) {
      console.log(error);
      if (error) {
        throw new BadRequestException();
      }
    }
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async findByUser(@Request() req) {
    const result = await this.orderService.findByQuery({ user: req.user_id });
    return { data: result };
  }

  @Get()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const result = await this.orderService.findAll();
    return { data: result };
  }
}
