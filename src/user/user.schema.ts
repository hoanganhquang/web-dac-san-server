import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: '' })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: '', unique: true })
  phone: string;

  @Prop({ default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
