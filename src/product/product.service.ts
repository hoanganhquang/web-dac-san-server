import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  create(data: {}): Promise<Product> {
    return this.productModel.create(data);
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  findByQuery(query: {}): Promise<Product[]> {
    return this.productModel.find(query).exec();
  }

  update(id: string, data: any): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id).exec();
  }
}
