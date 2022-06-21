import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  create() {
    return 'This action adds a new region';
  }

  findAll() {
    return `This action returns all region`;
  }

  findOne(id: number) {
    return `This action returns a #${id} region`;
  }

  update(id: number) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
