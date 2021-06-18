import type { SocketStream } from 'fastify-websocket';
import * as methods from './methods';

type PrimitiveType = string | number | boolean | null;

export type WSPayloadDataType =
  | PrimitiveType
  | PrimitiveType[]
  | { [x: string]: WSPayloadDataType };

export default function wsHandler(connection: SocketStream): void {
  // TODO find a way to trigger this for integration test
  connection.on('error', () => {
    // if (err.message === 'Invalid WebSocket frame: invalid UTF-8 sequence')
    //   return;
    // console.info('socket error');
    // console.dir(err);
  });

  connection.socket.on('message', _message => {
    const responsePayload: {
      success: boolean;
      data?: string;
      error?: string;
    } = {
      success: false,
    };

    try {
      if (typeof _message !== 'string') {
        throw Error('Payload must be string!');
      }

      const message = _message.trim();

      if (!message.startsWith('{') || !message.endsWith('}'))
        throw Error('Payload must be serialized JSON string!');

      const payload: {
        type: keyof typeof methods;
        data: WSPayloadDataType;
      } = JSON.parse(message);

      if (!payload.type) {
        throw Error("Payload doesn't have valid properties");
      }

      const method = methods[payload.type];

      if (method !== undefined) {
        responsePayload.success = true;

        const result = method(payload.data);

        if (result) {
          responsePayload.data = result;
        }
      }
    } catch (error) {
      console.group(error.message);
      console.info(_message, typeof _message);
      console.groupEnd();

      responsePayload.error = `Bad request: ${error.message}`;
    }

    connection.socket.send(JSON.stringify(responsePayload));
  });

  // connection.socket.on('close', (code, reason) => {
  //   console.log(code, reason);
  // });
}
