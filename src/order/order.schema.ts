import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';
import * as moment from 'moment';
import { User } from 'src/user/user.schema';

export type OrderDocument = Order & Document;

const now = moment().format('YYYY-MM-DD');

@Schema()
export class Order {
  @Prop({ default: now })
  orderDate: mSchema.Types.Date;

  @Prop()
  total: number;

  @Prop([
    raw({
      product: { type: mSchema.Types.ObjectId, ref: 'product' },
      name: String,
      price: Number,
      quantity: Number,
    }),
  ])
  details: [];

  @Prop({ type: mSchema.Types.ObjectId, ref: 'user' })
  user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
