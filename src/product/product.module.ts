import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;

          schema.methods.reduceQuantity = async function (amount: number) {
            this.quantityInStock = this.quantityInStock - amount;
          };

          return schema;
        },
      },
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: function (req, file, cb) {
            cb(null, './src/public/images');
          },
          filename: function (req, file, cb) {
            cb(null, file.originalname);
          },
        }),
      }),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
