import { GqlModuleOptions } from '@nestjs/graphql';

export interface Config {
  port: number;
  graphql: GqlModuleOptions;
  auth: AuthConfig;
  database: DatabaseConfig;
}

export interface DatabaseConfig {
  seed: {
    models: string[];
  };
}

export interface AuthConfig {
  bcrypt: BcryptConfig;
  jwt: JwtConfig;
}

export interface BcryptConfig {
  bcryptSaltOrRound: string | number;
}

export interface JwtConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  signOptions: {
    expiresIn: string;
    refreshIn: string;
  };
}
