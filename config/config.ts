import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { Config } from './config.interface';

export default (): Config => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  graphql: {
    playground: true,
    debug: true,
    sortSchema: true,
    buildSchemaOptions: {
      numberScalarMode: 'integer',
    },
    introspection: true,
    autoSchemaFile: './src/schema.graphql',
    formatError: (error: GraphQLError) => {
      console.dir(error);
      const graphQLFormattedError: GraphQLFormattedError = {
        message:
          error.extensions.exception?.response?.message ||
          error?.message ||
          'Unknow error',
        extensions: error.extensions,
      };
      return graphQLFormattedError;
    },
  },
  auth: {
    bcrypt: {
      bcryptSaltOrRound: 10,
    },
    jwt: {
      accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
      refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
      signOptions: {
        expiresIn: '5m',
        refreshIn: '5d',
      },
    },
  },
});
