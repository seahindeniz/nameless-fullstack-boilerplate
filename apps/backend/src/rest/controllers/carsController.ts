import { boomify } from '@hapi/boom';
import { RouteHandler } from 'fastify';
import Car, { CarData } from '../../models/Car';

type ParamsType = {
  id: string;
};

export const getCars = async (): Promise<CarData[]> => Car.find();

export const getSingleCar: RouteHandler<{
  Params: ParamsType;
}> = async req => {
  try {
    const car = await Car.findById(req.params.id);

    return car;
  } catch (error) {
    throw boomify(<Error>error);
  }
};

export const addCar: RouteHandler<{
  Body: CarData;
}> = async req => new Car(req.body).save();

export const updateCar: RouteHandler<{
  Params: ParamsType;
  Body: CarData;
}> = async req => {
  const { id } = req.params;
  const car = req.body;

  return Car.findByIdAndUpdate(id, car, { new: true });

  /* try {} catch (err) {
    throw boom.boomify(err);
  } */
};

export const deleteCar: RouteHandler<{
  Params: ParamsType;
}> = async req => {
  const result = await Car.deleteOne({ _id: req.params.id });

  if (result.deletedCount !== 1) {
    return null;
  }

  return req.params;
};
