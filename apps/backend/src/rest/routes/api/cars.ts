import type { RouteOptions } from 'fastify';
import {
  addCar,
  deleteCar,
  getCars,
  getSingleCar,
  updateCar,
} from '../../controllers/carsController';
import { CarDocument, CarData } from '../../../models/schema/Car.json';

const tags = ['cars'];
const params = {
  id: {
    type: 'string',
  },
};

const getCarsRoute: RouteOptions = {
  method: 'GET',
  url: '/cars',
  handler: getCars,
  schema: {
    description: 'Returns all cars',
    tags,
    summary: 'Returns all cars',
    response: {
      200: {
        type: 'array',
        items: CarDocument,
      },
    },
  },
};

const getCarRoute = <RouteOptions>{
  method: 'GET',
  url: '/cars/:id',
  handler: getSingleCar,
  schema: {
    description: 'Returns a car',
    tags,
    summary: 'Returns a car with given id',
    params,
    response: {
      200: {
        nullable: true,
        ...CarData,
      },
    },
  },
};

const postCarRoute = <RouteOptions>{
  method: 'POST',
  url: '/cars',
  handler: addCar,
  schema: {
    description: 'Create a new car',
    tags,
    summary: 'Creates new car with given values',
    body: CarData,
    response: {
      200: CarDocument,
    },
  },
};
const putCarRoute = <RouteOptions>{
  method: 'PUT',
  url: '/cars/:id',
  handler: updateCar,
  schema: {
    description: 'Update a car',
    tags,
    summary: 'Updates a car with given values',
    params,
    body: CarData,
    response: {
      200: CarData,
    },
  },
};

const deleteCarRoute = <RouteOptions>{
  method: 'DELETE',
  url: '/cars/:id',
  handler: deleteCar,
  schema: {
    description: 'Deletes a car',
    tags,
    summary: 'Deletes a car with given id',
    params,
    response: {
      200: {
        nullable: true,
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
    },
  },
};

export default [
  getCarsRoute,
  getCarRoute,
  postCarRoute,
  putCarRoute,
  deleteCarRoute,
];
