import { Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(email: string, password: string): Promise<User> {
    return this.userModel.create({ email, password });
  }

  findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).select('-password').exec();
  }

  update(id: string, data: {}) {
    return this.userModel
      .findByIdAndUpdate({ _id: id }, data, { new: true })
      .select('-password')
      .exec();
  }

  updatePass(id: string, data: {}) {
    return this.userModel
      .updateOne({ _id: id }, data)
      .select('-password')
      .exec();
  }
}
