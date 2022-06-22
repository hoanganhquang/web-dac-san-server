import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Province, ProvinceDocument } from './province.schema';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectModel(Province.name) private provinceModel: Model<ProvinceDocument>,
  ) {}

  create(name: string): Promise<Province> {
    return this.provinceModel.create({ name });
  }

  findAll(): Promise<Province[]> {
    return this.provinceModel.find().exec();
  }

  update(id: string, data: any): Promise<Province> {
    return this.provinceModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  remove(id: string): Promise<Province> {
    return this.provinceModel.findByIdAndRemove(id).exec();
  }
}
