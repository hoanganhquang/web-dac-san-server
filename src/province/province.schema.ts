import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProvinceDocument = Province & Document;

@Schema()
export class Province {
  @Prop({ required: true, unique: true })
  name: string;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);
