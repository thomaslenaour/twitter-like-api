import { GqlModuleOptions } from '@nestjs/graphql';

export interface Config {
  port: number;
  graphql: GqlModuleOptions;
  auth: AuthConfig;
}

export interface AuthConfig {
  jwt: JwtConfig;
}

export interface JwtConfig {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
}
