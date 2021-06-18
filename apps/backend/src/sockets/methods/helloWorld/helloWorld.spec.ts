import helloWorldHandler from './helloWorld';

it('Call handler with message and expect console.info to be called', () => {
  const consoleSpy = jest.spyOn(console, 'info').mockImplementation();

  helloWorldHandler('testing..');

  expect(consoleSpy).toBeCalled();

  consoleSpy.mockRestore();
});
