import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { ConfigModule } from '@nestjs/config';
import { ProvinceModule } from './province/province.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { AdminModule } from './admin/admin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.DATABASE_URI.replace('<password>', process.env.DATABASE_PASS),
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../src/public/images'),
    }),
    AuthModule,
    UserModule,
    RegionModule,
    ProvinceModule,
    ProductModule,
    CartModule,
    OrderModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
