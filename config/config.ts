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
  },
});
