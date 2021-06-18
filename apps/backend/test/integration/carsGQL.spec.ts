import { gql } from 'mercurius-codegen';
import { Types } from 'mongoose';
import initApp from '../../src/app';
import { clearDBCollections, closeDB, connectDB } from '../dbHandler';

const sampleMutation = gql`
  mutation {
    addCar(
      car: { title: "Transporter", brand: "Volkswagen", price: 0, age: 1 }
    ) {
      id
    }
  }
`;

describe('Testing the Cars API', () => {
  const app = initApp();

  beforeAll(async () => connectDB());
  afterEach(async () => clearDBCollections());
  afterAll(async () => {
    await closeDB();
    await app.close();
  });

  it('Calling the "car" query with invalid car id should fail and return data null and error messages with status 400', async () => {
    const invalidId = 123123;
    const getCarResponse = await app.inject({
      method: 'POST',
      payload: {
        operationName: 'GetCar',
        query: gql`
          query GetCar($id: ObjectId!) {
            car(id: $id) {
              id
              brand
              price
              age
            }
          }
        `,
        variables: {
          id: invalidId,
        },
      },
      url: '/graphql',
    });

    const getCarPayload = JSON.parse(getCarResponse.payload);

    expect(getCarResponse.statusCode).toBe(400);
    expect(getCarPayload.data).toBeNull();
    expect(getCarPayload.errors).toContainEqual(
      expect.objectContaining({
        message: expect.stringContaining(String(invalidId)),
      }),
    );
  });

  it('Calling the "car" query with invalid car id should fail and return data null and error messages with status 400', async () => {
    const invalidId = '-***-invalid-car-id-***-';
    const getCarResponse = await app.inject({
      method: 'POST',
      payload: {
        operationName: 'GetCar',
        query: gql`
          query GetCar($id: ObjectId!) {
            car(id: $id) {
              id
              brand
              price
              age
            }
          }
        `,
        variables: {
          id: invalidId,
        },
      },
      url: '/graphql',
    });

    const getCarPayload = JSON.parse(getCarResponse.payload);

    expect(getCarResponse.statusCode).toBe(400);
    expect(getCarPayload.data).toBeNull();
    expect(getCarPayload.errors).toContainEqual(
      expect.objectContaining({
        message: expect.stringContaining(invalidId),
      }),
    );
  });

  it('Calling the "car" query with non-exist car id should fail and return null with status 200', async () => {
    const getCarResponse = await app.inject({
      method: 'POST',
      payload: {
        operationName: 'GetCar',
        query: gql`
          query GetCar($id: ObjectId!) {
            car(id: $id) {
              id
              brand
              price
              age
            }
          }
        `,
        variables: {
          id: '60827fa7cb29ef1f30fc5f13',
        },
      },
      url: '/graphql',
    });

    const getCarPayload = JSON.parse(getCarResponse.payload);

    expect(getCarResponse.statusCode).toBe(200);
    expect(getCarPayload.data.car).toBeNull();
  });

  it('Mutation "addCar" should return a valid id number with status 200', async () => {
    const response = await app.inject({
      method: 'POST',
      payload: {
        operationName: null,
        query: sampleMutation,
        variables: {},
      },
      url: '/graphql',
    });

    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(Types.ObjectId.isValid(payload.data.addCar.id)).toBe(true);
  });

  it('Query "car" should return a valid id number with status 200', async () => {
    const carCreationResponse = await app.inject({
      method: 'POST',
      payload: {
        operationName: null,
        query: sampleMutation,
        variables: {},
      },
      url: '/graphql',
    });

    expect(carCreationResponse.statusCode).toBe(200);

    const addCarPayload = JSON.parse(carCreationResponse.payload);

    const getCarResponse = await app.inject({
      method: 'POST',
      payload: {
        operationName: 'GetCar',
        query: gql`
          query GetCar($id: ObjectId!) {
            car(id: $id) {
              id
              brand
              price
              age
            }
          }
        `,
        variables: {
          id: addCarPayload.data.addCar.id,
        },
      },
      url: '/graphql',
    });

    const getCarPayload = JSON.parse(getCarResponse.payload);

    const carData = getCarPayload.data.car;

    expect(getCarResponse.statusCode).toBe(200);
    expect(Types.ObjectId.isValid(carData.id)).toBe(true);
    expect(carData.title).not.toBeNull();
    expect(carData.brand).not.toBeNull();
    expect(carData.price).not.toBeNull();
    expect(carData.age).not.toBeNull();
  });

  it('Query "cars" should return array of cars with status 200', async () => {
    const carCreationResponse = await app.inject({
      method: 'POST',
      payload: {
        operationName: null,
        query: sampleMutation,
        variables: {},
      },
      url: '/graphql',
    });

    expect(carCreationResponse.statusCode).toBe(200);

    const addCarPayload = JSON.parse(carCreationResponse.payload);

    const carsResponse = await app.inject({
      method: 'POST',
      payload: {
        operationName: null,
        query: gql`
          query {
            cars {
              id
              title
            }
          }
        `,
        variables: {},
      },
      url: '/graphql',
    });

    const getCarPayload = JSON.parse(carsResponse.payload);

    expect(getCarPayload?.data?.cars).toBeInstanceOf(Object);

    const { cars } = getCarPayload.data;

    expect(carsResponse.statusCode).toBe(200);
    expect(cars.length > 0).toBeTruthy();
    expect(cars).toContainEqual(
      expect.objectContaining({ id: addCarPayload.data.addCar.id }),
    );
  });
});
