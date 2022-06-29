import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { MongoExceptionFilter } from 'src/exceptions/mongo.exception';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
  ) {}

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

    await this.cartService.create({
      user: res.userId,
      products: [],
    });

    if (res === null) throw new UnauthorizedException();

    return { access_token: res.access_token };
  }
}
