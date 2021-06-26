import initApp from '../../src/app';
import { clearDBCollections, closeDB, connectDB } from '../dbHandler';

describe('Test app by initializing all API services', () => {
  const app = initApp();

  beforeAll(async () => connectDB());
  afterEach(async () => clearDBCollections());
  afterAll(async () => {
    await closeDB();
    await app.close();
  });

  it('Get base route should return a JSON object with status 200', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });

    const expected = JSON.stringify({
      hello: 'world',
    });

    expect(response.statusCode).toBe(200);
    expect(response.payload).toEqual(expected);
  });
});
