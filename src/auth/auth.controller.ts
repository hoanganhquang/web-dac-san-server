import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { MongoExceptionFilter } from 'src/exceptions/mongo.exception';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() authUserDto: AuthUserDto) {
    if (!authUserDto?.email || !authUserDto?.password)
      throw new BadRequestException();

    const res = await this.authService.signIn(
      authUserDto.email,
      authUserDto.password,
    );

    if (res === null) throw new UnauthorizedException();

    return res;
  }

  @Post('signup')
  @UseFilters(MongoExceptionFilter)
  async signUn(@Body() authUserDto: AuthUserDto) {
    if (!authUserDto?.email || !authUserDto?.password)
      throw new BadRequestException();

    const res = await this.authService.signUp(
      authUserDto.email,
      authUserDto.password,
    );

    if (res === null) throw new UnauthorizedException();

    return res;
  }
}
