import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Region, RegionSchema } from './region.shema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Region.name,
        useFactory: () => {
          const schema = RegionSchema;

          schema.pre(/^find/, function (next) {
            this.populate({
              path: 'provinces',
              select: '-__v',
            });

            next();
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
