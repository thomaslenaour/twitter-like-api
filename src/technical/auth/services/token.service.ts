import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

import { Token } from '../models/token.model';

import { JwtConfig } from 'config/config.interface';
import {
  JwtAccessTokenInput,
  JwtCreateToken,
  JwtRefreshTokenInput,
  JwtRefreshTokenPayload,
} from '../types/jwt.interface';
import { TokenRepository } from '../repositories/token.repository';

@Injectable()
export class TokenService {
  private jwtConfig: JwtConfig;

  constructor(
    private tokenRepository: TokenRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get('auth.jwt');
  }

  generateAccessToken(payload: Omit<JwtCreateToken, 'jti'>) {
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(payload: JwtCreateToken, ipAddress: string) {
    try {
      const { jti, isRevoked } = payload?.jti
        ? await this.tokenRepository.updateRefreshToken(
            payload.jti,
            payload.sub,
            ipAddress,
          )
        : await this.tokenRepository.createRefreshToken(payload.sub, ipAddress);

      if (isRevoked) {
        throw new Error('Token is revoked.');
      }

      const formattedPayload: JwtCreateToken = {
        pseudo: payload.pseudo,
        sub: payload.sub,
        jti,
      };

      return this.jwtService.sign(formattedPayload, {
        secret: this.jwtConfig.refreshTokenSecret,
        expiresIn: this.jwtConfig.signOptions.refreshIn,
      });
    } catch (err) {
      throw new Error(err?.message || 'Invalid token.');
    }
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verify<JwtRefreshTokenPayload>(token, {
      secret: this.jwtConfig.refreshTokenSecret,
    });
  }
}
