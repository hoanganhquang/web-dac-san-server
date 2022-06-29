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
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ProductService } from './product.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    const result = await this.productService.findAll();
    return { data: result };
  }

  @Get('q')
  async findByQuery(@Query('province') qProvince: string) {
    const result = await this.productService.findByQuery({
      province: qProvince,
    });
    return { data: result };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.productService.findOne(id);
    return { data: result };
  }

  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() data, @UploadedFile() file: Express.Multer.File) {
    try {
      data.image = file.originalname;
      const result = await this.productService.create(data);
      return { data: result };
    } catch (error) {
      console.log(error);
      if (error) {
        throw new BadRequestException();
      }
    }
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() data) {
    try {
      const result = await this.productService.update(id, data);
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
      const result = await this.productService.remove(id);
      return { data: result };
    } catch (error) {
      console.log(error);
      if (error) {
        throw new BadRequestException();
      }
    }
  }
}
