import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from '../config/config';

import { PrismaModule } from './technical/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
      expandVariables: true,
    }),
    PrismaModule,
  ],
})
export class AppModule {}
