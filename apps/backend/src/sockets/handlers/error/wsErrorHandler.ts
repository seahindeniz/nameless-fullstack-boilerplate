const ignoredErrors = ['Invalid WebSocket frame: invalid UTF-8 sequence'];

export default function wsErrorHandler(err: Error): void {
  if (ignoredErrors.includes(err.message)) return;

  console.info('socket error');
  // eslint-disable-next-line no-console
  console.dir(err);
}
