import { Boom } from '@hapi/boom';
import fastify, {
  FastifyError,
  FastifyInstance,
  FastifyServerOptions,
} from 'fastify';
import mongoose from 'mongoose';
import registerGQL from './graphql';
import registerREST from './rest';
import registerWS from './sockets';

export default function initApp({
  scope = ['gql', 'rest', 'ws'],
  ...opts
}: {
  scope?: ('ws' | 'rest' | 'gql')[];
} & FastifyServerOptions = {}): FastifyInstance {
  const app = fastify(opts);

  if (scope.includes('ws')) registerWS(app);

  if (scope.includes('gql')) registerGQL(app);

  if (scope.includes('rest')) registerREST(app);

  const defaultErrorHandler = app.errorHandler;

  app.setErrorHandler<FastifyError | (mongoose.CastError & Boom)>(
    (error, request, reply) => {
      if (!('isBoom' in error)) {
        defaultErrorHandler(error, request, reply);

        return;
      }

      // debug: remove following if scope
      /* if (
        error instanceof mongoose.Error &&
        error.kind !== 'ObjectId' &&
        error.path !== '_id'
      ) {
        console.log(request.url, request.method);
        console.dir(error);
      } */

      app.log.error(error);
      reply.status(error.output.statusCode).send(error.output.payload);
    },
  );

  return app;
}

const mongooseDefaultTransformerOptions = {
  virtuals: true,
  versionKey: false,
  transform(_: mongoose.Document, ret: mongoose.Document) {
    // eslint-disable-next-line no-underscore-dangle
    ret.id = ret._id;

    // eslint-disable-next-line no-underscore-dangle
    delete ret._id;
  },
};

export const connectDB = async (uri: string): Promise<void> => {
  await mongoose.connect(uri, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.set('toJSON', mongooseDefaultTransformerOptions);
  mongoose.set('toObject', mongooseDefaultTransformerOptions);
};
