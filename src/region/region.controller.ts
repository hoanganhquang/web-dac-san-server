import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegionService } from './region.service';

@Controller('/api/v1/regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  // @Post()
  // create() {
  //   return this.regionService.create();
  // }

  @Get()
  async findAll() {
    const data = await this.regionService.findAll();

    return { data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.regionService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
