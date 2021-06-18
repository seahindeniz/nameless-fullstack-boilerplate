// eslint-disable-next-line max-classes-per-file
import { getModelForClass, prop as TypegooseProp } from '@typegoose/typegoose';
import { Min, MinLength } from 'class-validator';
import {
  Field as GQLField,
  InputType,
  Int,
  ObjectType as GQLType,
} from 'type-graphql';
import ObjectIdScalar from '../graphql/scalar/ObjectId.scalar';

@GQLType()
@InputType('ServiceInput')
class Service {
  @GQLField(() => String)
  @TypegooseProp({ type: String, required: true })
  service: string;

  @GQLField(() => Date)
  @TypegooseProp({ type: Date, required: true })
  date: Date;
}

@InputType()
@GQLType()
export class CarData {
  /**
   * Model name
   * @minLength 1
   */
  @GQLField(() => String)
  @MinLength(1)
  @TypegooseProp({ required: true, minlength: 1 })
  title: string;

  /**
   * Brand name
   * @minLength 1
   */
  @GQLField(() => String)
  @TypegooseProp({ required: true, minlength: 1 })
  brand: string;

  /**
   * @minimum 0
   */
  @GQLField(() => Int)
  @Min(0)
  @TypegooseProp({ required: true, min: 0 })
  price: number;

  /**
   * @minimum 0
   */
  @GQLField(() => Int)
  @TypegooseProp({ required: true, min: 0 })
  age: number;

  /**
   * @hidden
   */
  @TypegooseProp({ required: true, default: Date })
  createdAt?: Date;

  @GQLField(() => [Service], { nullable: true })
  @TypegooseProp({ type: Service, default: [], _id: false })
  services?: Service[];
}

@GQLType()
export class CarDocument extends CarData {
  @GQLField(() => ObjectIdScalar)
  readonly id?: string;

  @GQLField()
  readonly createdAt?: Date;
}

export default getModelForClass(CarData, {
  options: {
    // ⚠ The class name is also the default name of the db collection.
    // so the following line changes the collection name from cardatas to cars
    customName: 'cars',
  },
});
