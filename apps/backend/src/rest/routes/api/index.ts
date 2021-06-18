import { FastifyInstance } from 'fastify';
import carsRoutes from './cars';

export default function registerApiRoute(app: FastifyInstance): void {
  app.register(
    async (mutatedApp: FastifyInstance) =>
      carsRoutes.forEach(route => {
        mutatedApp.route(route);
      }),
    { prefix: '/api' },
  );
}
