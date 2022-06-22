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
import { RegionService } from './region.service';

@Controller('/api/v1/regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async create(@Body() regionData) {
    try {
      const result = await this.regionService.create(
        regionData.name,
        regionData.provinces,
      );
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
    const data = await this.regionService.findAll();

    return { data };
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateData: any) {
    try {
      const result = await this.regionService.update(id, updateData);
      return { data: result };
    } catch (error) {
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
      const result = await this.regionService.remove(id);
      return { data: result };
    } catch (error) {
      if (error) {
        throw new BadRequestException();
      }
    }
  }
}
