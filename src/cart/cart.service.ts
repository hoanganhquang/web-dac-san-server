import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  create(data: {}): Promise<Cart> {
    return this.cartModel.create(data);
  }

  findOne(query: {}): Promise<Cart> {
    return this.cartModel.findOne(query).exec();
  }

  update(id: string, data: any): Promise<Cart> {
    return this.cartModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
