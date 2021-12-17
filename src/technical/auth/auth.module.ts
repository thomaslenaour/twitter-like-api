import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtConfig } from 'config/config.interface';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { AuthRepository } from './repositories/auth.repository';
import { TokenRepository } from './repositories/token.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get<JwtConfig>('auth.jwt');
        return {
          secret: jwtConfig.accessTokenSecret,
          signOptions: {
            expiresIn: jwtConfig.signOptions.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    PasswordService,
    TokenService,
    AuthRepository,
    TokenRepository,
    JwtStrategy,
    GqlAuthGuard,
  ],
})
export class AuthModule {}
