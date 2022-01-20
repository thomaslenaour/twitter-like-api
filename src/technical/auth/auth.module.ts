import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtConfig } from 'config/config.interface';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { TokenRepository } from './repositories/token.repository';
import { UserRepository } from 'src/business/user/user.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { UserService } from 'src/business/user/user.service';

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
    UserService,
    PasswordService,
    TokenService,
    TokenRepository,
    UserRepository,
    JwtStrategy,
    GqlAuthGuard,
    SendgridService,
  ],
})
export class AuthModule {}
