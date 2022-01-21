import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { JwtConfig } from 'config/config.interface';
import { JwtCreateToken, JwtRefreshTokenPayload } from '../types/jwt.interface';
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
        throw new BadRequestException('Token is revoked.');
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
      throw err;
    }
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verify<JwtRefreshTokenPayload>(token, {
      secret: this.jwtConfig.refreshTokenSecret,
    });
  }
}
