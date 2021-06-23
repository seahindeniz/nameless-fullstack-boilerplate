import WebSocket from 'ws';
import getPort from 'get-port';
import initApp from '../../src/app';

describe('Testing WebSocket connection', () => {
  let appPort: number;
  let client: WebSocket;

  const app = initApp({ scope: ['ws'] });

  const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
  const consoleGroupSpy = jest.spyOn(console, 'group').mockImplementation();

  beforeAll(async () => {
    appPort = await getPort();

    return app.listen(appPort);
  });
  afterEach(jest.clearAllMocks);
  afterAll(() => {
    jest.restoreAllMocks();

    return app.close();
  });

  it('Connect to WS server', done => {
    client = new WebSocket(`ws://localhost:${appPort}/ws`);

    client.on('open', () => {
      expect(client.readyState === WebSocket.OPEN).toBe(true);
      done();
    });
  });

  it('Send an invalid message and validate', done => {
    client.send(null, err => expect(err).toBeFalsy());

    client.once('message', data => {
      expect(typeof data).toBe('string');

      const payload = JSON.parse(<string>data);

      expect(consoleInfoSpy).toBeCalledTimes(1);
      expect(consoleGroupSpy).toBeCalledTimes(1);
      expect(payload.success).toBe(false);
      expect(payload.error).toBe('Bad request: Payload must be string!');
      done();
    });
  });

  it('Send an empty string and validate', done => {
    client.send('');

    client.once('message', data => {
      expect(typeof data).toBe('string');

      const payload = JSON.parse(<string>data);

      expect(consoleInfoSpy).toBeCalledTimes(1);
      expect(consoleGroupSpy).toBeCalledTimes(1);
      expect(payload.success).toBe(false);
      expect(payload.error).toBe(
        'Bad request: Payload must be serialized JSON string!',
      );
      done();
    });
  });

  it('Send an invalid serialized JSON and validate', done => {
    client.send(JSON.stringify({}));

    client.once('message', data => {
      expect(typeof data).toBe('string');

      const payload = JSON.parse(<string>data);

      expect(consoleInfoSpy).toBeCalledTimes(1);
      expect(consoleGroupSpy).toBeCalledTimes(1);
      consoleInfoSpy.mockReset();
      consoleGroupSpy.mockReset();
      expect(payload.success).toBe(false);
      expect(payload.error).toBe(
        "Bad request: Payload doesn't have valid properties",
      );
      done();
    });
  });

  it('Send an invalid payload and validate', done => {
    client.send(
      JSON.stringify({
        type: '# an invalid type #',
      }),
    );

    client.once('message', data => {
      expect(typeof data).toBe('string');

      const payload = JSON.parse(<string>data);

      expect(payload.success).toBe(false);
      done();
    });
  });

  it('Send a valid serialized JSON and expect data', done => {
    client.send(
      JSON.stringify({
        type: 'ping',
      }),
    );

    client.once('message', data => {
      expect(typeof data).toBe('string');

      const payload = JSON.parse(<string>data);

      expect(payload.success).toBe(true);
      expect(payload.data).toBe('Pong!');
      done();
    });
  });

  it('Send a valid serialized JSON and expect no data', done => {
    client.send(
      JSON.stringify({
        type: 'helloWorld',
      }),
    );

    client.once('message', data => {
      expect(typeof data).toBe('string');

      const payload = JSON.parse(<string>data);

      expect(payload.success).toBe(true);
      done();
    });
  });

  it('Close WS connection', done => {
    client.close();

    client.on('close', async () => {
      expect(client.readyState === client.CLOSED).toBe(true);
      done();
    });
  });
});
