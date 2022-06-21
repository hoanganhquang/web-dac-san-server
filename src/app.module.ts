import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { ConfigModule } from '@nestjs/config';

// const db = process.env.DATABASE_URI.replace(
//   '<password>',
//   process.env.DATABASE_PASS,
// );

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.DATABASE_URI.replace('<password>', process.env.DATABASE_PASS),
    ),
    AuthModule,
    UserModule,
    RegionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
