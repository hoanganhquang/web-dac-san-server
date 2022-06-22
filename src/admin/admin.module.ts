import { Module } from '@nestjs/common';
import { OrderModule } from 'src/order/order.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [OrderModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
