import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema, Types } from 'mongoose';
import { Province } from 'src/province/province.schema';

export type RegionDocument = Region & Document;

@Schema()
export class Region {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: mSchema.Types.ObjectId, ref: Province.name }] })
  provinces: Province[];
}

export const RegionSchema = SchemaFactory.createForClass(Region);
