import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtAccessTokenPayload, JwtDecodedUser } from '../types/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwt').accessTokenSecret,
    });
  }

  async validate(payload: JwtAccessTokenPayload): Promise<JwtDecodedUser> {
    return { userId: payload.sub, pseudo: payload.pseudo };
  }
}
