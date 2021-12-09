import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from '../config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
