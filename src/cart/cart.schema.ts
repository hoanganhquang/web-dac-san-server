import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';
import { User } from 'src/user/user.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: mSchema.Types.ObjectId, ref: 'user', required: true })
  province: User;

  @Prop()
  products: [
    {
      product: {
        type: mSchema.Types.ObjectId;
        ref: 'product';
      };
      name: {
        type: String;
      };
      price: {
        type: Number;
      };
      quantity: {
        type: Number;
      };
    },
  ];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
