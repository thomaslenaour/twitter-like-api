import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

import config from '../config/config';

import { TweetModule } from './business/tweet/tweet.module';
import { UserModule } from './business/user/user.module';
import { AuthModule } from './technical/auth/auth.module';
import { CaslModule } from './technical/casl/casl.module';
import { GqlAuthGuard } from './technical/auth/guards/gql-auth.guard';
import { PrismaModule } from './technical/prisma/prisma.module';
import { FollowsModule } from './business/follows/follows.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
      expandVariables: true,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get('graphql');
      },
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthModule,
    CaslModule,
    UserModule,
    TweetModule,
    FollowsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: GqlAuthGuard }],
})
export class AppModule {}
