import { Types } from 'mongoose';
import initApp from '../../src/app';
import { CarData } from '../../src/models/Car';
import { clearDBCollections, closeDB, connectDB } from '../dbHandler';

describe('Testing the Cars API', () => {
  const app = initApp();

  beforeAll(async () => connectDB());
  afterEach(async () => clearDBCollections());
  afterAll(async () => {
    await closeDB();
    await app.close();
  });

  const carRequestPayload = <CarData>{
    title: 'z3',
    brand: 'BMW',
    price: 7000,
    age: 10,
    services: [
      {
        service: 'BMW Istanbul',
        date: new Date('2021-01-01T12:29:50.268'),
      },
      {
        service: 'BMW Izmir',
        date: new Date('2021-01-03T16:11:00.153'),
      },
    ],
  };

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

  it('Post cars should return new car obj with status 200', async () => {
    const response = await app.inject({
      method: 'POST',
      payload: carRequestPayload,
      url: '/api/cars',
    });

    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(Types.ObjectId.isValid(payload.id)).toBe(true);
  });

  it('Post cars should fail and return error payload with status 400', async () => {
    const response = await app.inject({
      method: 'POST',
      payload: {},
      url: '/api/cars',
    });

    const carPayload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(400);
    expect(carPayload.error).toBe('Bad Request');
    expect(carPayload.message).toBe(
      "body should have required property 'title'",
    );
  });

  it('Get cars should return array of cars obj with status 200', async () => {
    const carCreationResponse = await app.inject({
      method: 'POST',
      payload: carRequestPayload,
      url: '/api/cars',
    });
    const carPayload = JSON.parse(carCreationResponse.payload);
    const response = await app.inject({
      method: 'GET',
      url: '/api/cars',
    });

    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(payload.length > 0).toBeTruthy();
    expect(payload).toContainEqual(
      expect.objectContaining({ id: carPayload.id }),
    );
  });

  it('Get single car should return car obj with status 200', async () => {
    const carCreationResponse = await app.inject({
      method: 'POST',
      payload: carRequestPayload,
      url: '/api/cars',
    });
    const createdCar = JSON.parse(carCreationResponse.payload);
    const response = await app.inject({
      method: 'GET',
      url: `/api/cars/${createdCar.id}`,
    });

    const carPayload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(carPayload.title).not.toBeNull();
    expect(carPayload.brand).not.toBeNull();
    expect(carPayload.price).not.toBeNull();
    expect(carPayload.age).not.toBeNull();
  });

  it('Get single car with non-exist car id should fail and return null with status 200', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/cars/60827fa7cb29ef1f30fc5f13',
    });

    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe('null');
  });

  it('Get single car with invalid car id should fail and return false with status 200', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/cars/-***-invalid-car-id-***-',
    });

    const carPayload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(500);
    expect(carPayload.error).toBe('Internal Server Error');
    expect(carPayload.message).toBe('An internal server error occurred');
  });

  it('Put car should return car obj with status 200', async () => {
    const carCreationResponse = await app.inject({
      method: 'POST',
      payload: carRequestPayload,
      url: '/api/cars',
    });
    const createdCarPayload = JSON.parse(carCreationResponse.payload);
    const newCarBrand = 'Toyota';

    createdCarPayload.brand = newCarBrand;

    const response = await app.inject({
      method: 'PUT',
      payload: createdCarPayload,
      url: `/api/cars/${createdCarPayload.id}`,
    });

    const updatedCarPayload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(updatedCarPayload.title).not.toBeNull();
    expect(updatedCarPayload.brand).not.toBeNull();
    expect(updatedCarPayload.price).not.toBeNull();
    expect(updatedCarPayload.age).not.toBeNull();
    expect(updatedCarPayload.brand).toEqual(newCarBrand);
  });

  it('Delete car should return status 200', async () => {
    const carCreationResponse = await app.inject({
      method: 'POST',
      payload: carRequestPayload,
      url: '/api/cars',
    });
    const createdCar = JSON.parse(carCreationResponse.payload);
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/cars/${createdCar.id}`,
    });

    const deletedCarPayload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(deletedCarPayload.id).toBe(createdCar.id);
  });

  it('Car deletion should fail', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/api/cars/60827fa7cb29ef1f30fc5f13',
    });

    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe('null');
  });
});
