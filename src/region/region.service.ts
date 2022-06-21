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

  findAll() {
    return this.regionModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} region`;
  }

  update(id: number) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
