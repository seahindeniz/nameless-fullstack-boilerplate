import { FastifyInstance } from 'fastify';
import fastifyWS, { SocketStream } from 'fastify-websocket';
import { wsErrorHandler, wsDataHandler } from './handlers';

function wsHandler(connection: SocketStream): void {
  connection.on('error', wsErrorHandler);
  connection.socket.on('error', wsErrorHandler);
  connection.socket.on('message', message =>
    wsDataHandler(message, connection),
  );
}

export default function registerWS(app: FastifyInstance): void {
  app.register(fastifyWS, {
    options: {
      maxPayload: 1 * 2 ** 20, // 1MB
    },
  });

  app.get('/ws', { websocket: true }, wsHandler);
}
