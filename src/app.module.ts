import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import config from '../config/config';
import { UserModule } from './business/user/user.module';

import { PrismaModule } from './technical/prisma/prisma.module';

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
    UserModule,
  ],
})
export class AppModule {}
