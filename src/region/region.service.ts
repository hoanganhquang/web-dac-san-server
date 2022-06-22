import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Province } from 'src/province/province.schema';
import { Region, RegionDocument } from './region.schema';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private regionModel: Model<RegionDocument>,
  ) {}

  create(name: string, provinces: []): Promise<Province> {
    return this.regionModel.create({ name, provinces });
  }

  findAll(): Promise<Province[]> {
    return this.regionModel.find().exec();
  }

  update(id: string, updateData: any): Promise<Province> {
    return this.regionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  remove(id: string): Promise<Province> {
    return this.regionModel.findByIdAndDelete(id).exec();
  }
}
