import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ProvinceService } from './province.service';

@Controller('api/v1/provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async create(@Body() data) {
    try {
      const result = await this.provinceService.create(data);
      return { data: result };
    } catch (error) {
      console.log(error);
      if (error) {
        throw new BadRequestException();
      }
    }
  }

  @Get()
  async findAll() {
    const result = await this.provinceService.findAll();
    return { data: result };
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() data) {
    try {
      const result = await this.provinceService.update(id, data);
      return { data: result };
    } catch (error) {
      console.log(error);
      if (error) {
        throw new BadRequestException();
      }
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      const result = await this.provinceService.remove(id);
      return { data: result };
    } catch (error) {
      console.log(error);
      if (error) {
        throw new BadRequestException();
      }
    }
  }
}
