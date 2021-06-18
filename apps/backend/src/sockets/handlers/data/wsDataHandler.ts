import { SocketStream } from 'fastify-websocket';
import * as methods from '../../methods';

type PrimitiveType = string | number | boolean | null;

export type WSPayloadDataType =
  | PrimitiveType
  | PrimitiveType[]
  | { [x: string]: WSPayloadDataType };

export default function wsDataHandler(
  _message: string | Buffer | ArrayBuffer | Buffer[],
  connection: SocketStream,
) {
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
  } catch (err) {
    const error = err as Error;

    console.group(error.message);
    console.info(_message, typeof _message);
    console.groupEnd();

    responsePayload.error = `Bad request: ${error.message}`;
  }

  connection.socket.send(JSON.stringify(responsePayload));
}
