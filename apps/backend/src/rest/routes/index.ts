import { FastifyInstance } from 'fastify';
import registerApiRoute from './api';

function registerMainRoute(app: FastifyInstance): void {
  app.get('/', async () => ({ hello: 'world' }));
}

export default [registerMainRoute, registerApiRoute];
