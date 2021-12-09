import { GqlModuleOptions } from '@nestjs/graphql';

export interface Config {
  port: number;
  graphql: GqlModuleOptions;
}
