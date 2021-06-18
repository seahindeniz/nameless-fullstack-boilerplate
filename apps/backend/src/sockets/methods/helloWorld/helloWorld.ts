import type { WSPayloadDataType } from '../../handlers';

export default function helloWorldHandler(data: WSPayloadDataType): void {
  console.info('helloWorld message:', data);
}
