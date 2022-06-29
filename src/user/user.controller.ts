import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async getInfo(@Request() req) {
    return { data: req.user };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async updatePass(@Request() req, @Body() data) {
    try {
      const user = await this.userService.findOne(req.user.email);

      if (user === null) throw new NotFoundException();

      const check = await bcrypt.compare(data.currentPass, user.password);

      if (!check) throw new BadRequestException();

      const newPass = await bcrypt.hash(data.newPassword, 10);

      const result = await this.userService.updatePass(req.user._id, {
        password: newPass,
      });

      return { data: result };
    } catch (error) {
      console.log(error);
      if (error) {
        throw new BadRequestException();
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Request() req, @Body() data) {
    try {
      if (data?.password) delete data.password;

      const result = await this.userService.update(req.user._id, data);
      return { data: result };
    } catch (error) {
      console.log(error);
      if (error) {
        throw new BadRequestException();
      }
    }
  }
}
