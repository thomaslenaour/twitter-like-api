import { GqlModuleOptions } from '@nestjs/graphql';

export interface Config {
  port: number;
  graphql: GqlModuleOptions;
  auth: AuthConfig;
  database: DatabaseConfig;
  services: ServicesConfig;
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

export interface ServicesConfig {
  sendgrid: SendgridConfig;
}

export interface SendgridConfig {
  apiKey: string;
  sendgridTemplateIds: SendgridTemplates;
  from: string;
}

export interface SendgridTemplates {
  [key: string]: string;
}
