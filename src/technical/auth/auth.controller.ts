import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { User } from 'src/business/user/models/user.model';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestType & { user: User }) {
    return this.authService.login(req.user);
  }
}
