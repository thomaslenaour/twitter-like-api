import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Token } from './models/token.model';

import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';

import { UserRepository } from '../../business/user/user.repository';

import { JwtCreateToken } from './types/jwt.interface';
import { SignupInput } from './dto/signup.input';
import { SendgridService } from '../sendgrid/sendgrid.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService,
    private sendgridService: SendgridService,
  ) {}

  async createUser(data: SignupInput, ipAddress: string): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      data.password,
    );

    try {
      const createdUser = await this.userRepository.createUser({
        ...data,
        email: data.email.toLowerCase(),
        password: hashedPassword,
      });

      const payload: JwtCreateToken = {
        pseudo: createdUser.pseudo,
        sub: createdUser.id,
      };

      // Work Here
      await this.sendgridService.sendWelcomeMail({
        to: createdUser.email,
        subject: 'Twitter Like - Bienvenue parmis nous',
        dynamicTemplateData: {
          first_name: createdUser.name,
        },
      });

      return {
        accessToken: this.tokenService.generateAccessToken(payload),
        refreshToken: await this.tokenService.generateRefreshToken(
          payload,
          ipAddress,
        ),
      };
    } catch (err) {
      throw err;
    }
  }

  async login(
    emailOrPseudo: string,
    password: string,
    ipAddress: string,
  ): Promise<Token> {
    try {
      const isEmail = emailOrPseudo.includes('@');
      const user = await this.userRepository.getUser(
        isEmail ? 'email' : 'pseudo',
        isEmail ? emailOrPseudo.toLowerCase() : emailOrPseudo,
      );

      if (!user) {
        throw new NotFoundException('No user found for this email or pseudo.');
      }

      const passwordIsValid = await this.passwordService.validatePassword(
        password,
        user.password,
      );

      if (!passwordIsValid) {
        throw new BadRequestException('Invalid password.');
      }

      const payload: JwtCreateToken = {
        pseudo: user.pseudo,
        sub: user.id,
      };

      return {
        accessToken: this.tokenService.generateAccessToken(payload),
        refreshToken: await this.tokenService.generateRefreshToken(
          payload,
          ipAddress,
        ),
      };
    } catch (err) {
      throw err;
    }
  }

  async refreshToken(refreshToken: string, ipAddress: string) {
    try {
      const { pseudo, sub, jti } =
        this.tokenService.verifyRefreshToken(refreshToken);

      const accessPayload: JwtCreateToken = {
        pseudo,
        sub,
      };
      const refreshPayload = { ...accessPayload, jti };

      return {
        accessToken: this.tokenService.generateAccessToken(accessPayload),
        refreshToken: await this.tokenService.generateRefreshToken(
          refreshPayload,
          ipAddress,
        ),
      };
    } catch (err) {
      throw err;
    }
  }
}
