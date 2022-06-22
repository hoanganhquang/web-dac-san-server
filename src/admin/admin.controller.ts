import {
  Controller,
  Get,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { OrderService } from 'src/order/order.service';

@Controller('api/v1/admin')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private orderService: OrderService) {}

  @Get('statistics')
  async statistics(@Query() query) {
    try {
      const date = query;
      let match: any;

      if (date.year) {
        match = {
          orderDate: {
            $gte: new Date(`${date.year}-01-01`),
            $lte: new Date(`${date.year}-12-31`),
          },
        };
      }

      if (date.month) {
        const oddMonth = [1, 3, 5, 7, 8, 10, 12];
        const evenMonth = [2, 4, 6, 9, 10, 11];
        const month = Number(date.month.split('-')[1]);
        const year = Number(date.month.split('-')[0]);

        if (oddMonth.includes(month)) {
          match = {
            orderDate: {
              $gte: new Date(`${year}-${month}-01`),
              $lte: new Date(`${year}-${month}-31`),
            },
          };
        }

        if (evenMonth.includes(month)) {
          match = {
            orderDate: {
              $gte: new Date(`${year}-${month}-01`),
              $lte: new Date(`${year}-${month}-30`),
            },
          };
        }
      }

      if (date.date) {
        match = {
          orderDate: new Date(date.date),
        };
      }

      const result = await this.orderService.statistics(match);

      return { data: result };
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
