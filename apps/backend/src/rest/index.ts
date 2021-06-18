import { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import swaggerOptions from './config/swagger';
import routesToRegister from './routes';

export default function registerREST(app: FastifyInstance): void {
  app.register(swagger, swaggerOptions);

  routesToRegister.forEach(registerFn => registerFn(app));
}
