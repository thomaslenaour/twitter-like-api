import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/business/user/models/user.model';

import { JwtPayload } from './auth.interface';

import { UserService } from 'src/business/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(emailOrUsername: string, password: string) {
    const isEmail = emailOrUsername.includes('@');
    const user = await this.userService.getUser(
      isEmail ? 'email' : 'pseudo',
      emailOrUsername,
    );

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = user;
      return userData;
    }

    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { username: user.pseudo, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
