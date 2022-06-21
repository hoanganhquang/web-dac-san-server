import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private jwtSign(user: any): { access_token: string } {
    const payload = { email: user.email, userId: user._id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    const user: User = await this.userService.findOne(email);

    if (!user) return null;

    const checkPass: boolean = await bcrypt.compare(password, user.password);

    if (!checkPass) return null;

    const token = this.jwtSign(user);
    return token;
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    const user: User = await this.userService.create(email, password);

    if (!user) return null;

    const token = this.jwtSign(user);
    return token;
  }

  async validateUser() {}
}
