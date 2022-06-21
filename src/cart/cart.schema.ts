import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';
import { User } from 'src/user/user.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: mSchema.Types.ObjectId, ref: 'user' })
  province: User;

  @Prop([
    raw({
      product: { type: mSchema.Types.ObjectId, ref: 'product' },
      name: String,
      price: Number,
      quantity: Number,
    }),
  ])
  products: [];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
