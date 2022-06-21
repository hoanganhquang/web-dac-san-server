import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';
import { Province } from 'src/province/province.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantityInStock: number;

  @Prop({ default: '' })
  image: string;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'province' })
  province: Province;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
