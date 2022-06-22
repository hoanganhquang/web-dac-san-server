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

  statistics(match: any) {
    return this.orderModel.aggregate([
      {
        $match: match,
      },
      {
        $lookup: {
          from: 'products',
          localField: 'details._id',
          foreignField: '_id',
          as: 'products',
        },
      },
      {
        $project: {
          _id: 1,
          total: 1,
          details: 1,
          'products.name': 1,
          'products._id': 1,
        },
      },
      {
        $project: {
          _id: 1,
          total: 1,
          products: {
            $concatArrays: ['$details', '$products'],
          },
        },
      },
      {
        $unwind: '$products',
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            products: '$products._id',
          },
          total: { $first: '$total' },
          products: { $mergeObjects: '$products' },
        },
      },
      {
        $group: {
          _id: '$_id._id',
          total: { $first: '$total' },
          products: { $push: '$products' },
        },
      },
    ]);
  }
}
