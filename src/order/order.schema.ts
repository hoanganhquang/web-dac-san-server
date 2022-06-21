import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Schema as mSchema } from 'mongoose';
import moment from 'moment';
import { User } from 'src/user/user.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ default: moment().format('YYYY-MM-DD') })
  orderDate: Date;

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
  province: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
