import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  create(data: {}): Promise<Order> {
    return this.orderModel.create(data);
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  findById(id: string) {
    return this.orderModel.findById(id).exec();
  }

  findByQuery(query: {}): Promise<Order[]> {
    return this.orderModel.find(query).exec();
  }
}
