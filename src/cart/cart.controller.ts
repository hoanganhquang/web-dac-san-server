import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CartService } from './cart.service';

@Controller('api/v1/carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findOne(@Request() req) {
    const result = await this.cartService.findOne({ user: req.user._id });
    return { data: result };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addToCart(@Request() req, @Body() data: any) {
    try {
      let check = false;

      const result: any = await this.cartService.findOne({
        user: req.user._id,
      });

      result.products.forEach((item: any) => {
        if (item._id == data._id) {
          let quantity = parseInt(item.quantity);
          quantity += parseInt(data.quantity);
          item.quantity = quantity;
          check = true;
        }
      });

      if (!check) {
        result.products.push(data);
      }

      const result1 = await this.cartService.update(result._id, {
        products: result.products,
      });

      return { data: result1 };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  @Patch(':action')
  @UseGuards(JwtAuthGuard)
  async updateCart(@Request() req, @Body() data: any, @Param('action') action) {
    try {
      const result: any = await this.cartService.findOne({
        user: req.user._id,
      });

      if (action == 'update') {
        result.products.forEach((item: any) => {
          if (item._id == data.product) {
            item.quantity = data.newQuantity;
          }
        });
      }

      if (action == 'remove') {
        result.products.forEach((item: any, index: number) => {
          if (item._id == data.product) {
            result.products.splice(index, 1);
          }
        });
      }

      const result1 = await this.cartService.update(result._id, {
        products: result.products,
      });

      return result1;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
