import { Types } from 'mongoose';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import Car, { CarDocument, CarData } from '../../models/Car';
import ObjectIdScalar from '../scalar/ObjectId.scalar';

@Resolver()
export default class CarResolver {
  @Query(() => CarDocument, { nullable: true })
  async car(
    @Arg('id', () => ObjectIdScalar) id: Types.ObjectId,
  ): Promise<CarDocument | null> {
    return Car.findById(id);
  }

  @Query(() => [CarDocument])
  async cars(): Promise<CarDocument[]> {
    return Car.find();
  }

  @Mutation(() => CarDocument)
  async addCar(@Arg('car') car: CarData): Promise<CarDocument> {
    return new Car(car).save();
  }
}
