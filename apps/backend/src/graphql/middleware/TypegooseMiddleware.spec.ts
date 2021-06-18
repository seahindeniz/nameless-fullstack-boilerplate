/* eslint-disable no-underscore-dangle */
import { model, Schema } from 'mongoose';
import type { ResolverData } from 'type-graphql';
import Car from '../../models/Car';
import typegooseMiddleware from './TypegooseMiddleware';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose');

// @ts-expect-error
// because first parameter of TypegooseMiddleware is currently ignored
const resolverData: ResolverData = {};

const sampleData = {
  _id: '507f191e810c19729de860ea',
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

describe('Testing global middleware for type-graphql library', () => {
  it('Pass string and expect the same value', async () => {
    const sample = 'sample string';
    const result = await typegooseMiddleware(resolverData, async () => sample);

    expect(result).toBe(sample);
  });

  it('Pass empty array and expect the same value', async () => {
    const sample: unknown[] = [];
    const result = await typegooseMiddleware(resolverData, async () => sample);

    expect(result instanceof Array).toBe(true);
    expect(result).toStrictEqual(sample);
  });

  it('Pass an unknown object and expect the same value', async () => {
    const schema = new Schema({
      name: String,
      email: String,
      created: { type: Date, default: Date.now },
    });
    const sampleInvalidData = {
      _id: '507f191e810c19729de860ea',
      name: 'name',
      email: 'name@email.com',
    };

    const dummyModel = model('User', schema);

    mockingoose(dummyModel).toReturn(sampleInvalidData, 'findOne');

    const doc = await dummyModel.findById(sampleInvalidData._id);
    const result = await typegooseMiddleware(resolverData, async () => doc);

    expect(result).toBeTruthy();
  });

  it('Pass a model and expect the same value', async () => {
    mockingoose(Car).toReturn(sampleData, 'findOne');

    const doc = await Car.findById(sampleData._id);
    const result = await typegooseMiddleware(resolverData, async () => doc);

    expect(result.title).toBe('z3');
  });

  it('Pass an array of model and empty object and expect the same value', async () => {
    mockingoose(Car).toReturn([sampleData], 'find');

    const docs = await Car.find({});
    const result = await typegooseMiddleware(resolverData, async () => [
      {},
      ...docs,
    ]);

    expect(result instanceof Array).toBe(true);
    expect(result.length > 0).toBe(true);
    expect(result).toContainEqual(expect.objectContaining({ title: 'z3' }));
  });
});
