import { FastifyInstance } from 'fastify';
import mercurius from 'mercurius';
import { buildSchemaSync } from 'type-graphql';
import typegooseMiddleware from './middleware/TypegooseMiddleware';
import carResolver from './resolvers/car.resolver';

export default function registerGQL(app: FastifyInstance): void {
  app.register(mercurius, {
    schema: buildSchemaSync({
      resolvers: [carResolver],
      // emitSchemaFile: 'schema.gql',
      globalMiddlewares: [typegooseMiddleware],
    }),
    graphiql: 'playground',
  });
}
