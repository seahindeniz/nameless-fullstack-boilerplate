import wsErrorHandler from './wsErrorHandler';

describe('Test WS connection error handler', () => {
  const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
  const consoleDirSpy = jest.spyOn(console, 'dir').mockImplementation();

  afterEach(jest.clearAllMocks);
  afterAll(jest.restoreAllMocks);

  it('calls with invalid UTF-8 sequence error', () => {
    const err = new Error('Invalid WebSocket frame: invalid UTF-8 sequence');

    expect(consoleInfoSpy).not.toBeCalled();
    expect(consoleDirSpy).not.toBeCalled();
    expect(wsErrorHandler(err)).toBe(undefined);
  });

  it('calls with an error', () => {
    const err = new Error('Just an error');

    expect(wsErrorHandler(err)).toBe(undefined);
    expect(consoleInfoSpy).toBeCalledTimes(1);
    expect(consoleDirSpy).toBeCalledTimes(1);
  });
});
