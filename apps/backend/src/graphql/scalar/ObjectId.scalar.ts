import { GraphQLScalarType, Kind, ValueNode } from 'graphql';
import { Types } from 'mongoose';

const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo object id scalar type',
  serialize(value: Types.ObjectId): string {
    if (!(value instanceof Types.ObjectId)) {
      throw new Error('ObjectIdScalar can only serialize ObjectId values');
    }

    return value.toHexString();
  },
  parseValue(value: unknown): Types.ObjectId {
    if (typeof value !== 'string') {
      throw new Error('ObjectIdScalar can only parse string values');
    }

    return Types.ObjectId(value);
  },
  parseLiteral(ast: ValueNode): Types.ObjectId {
    if (ast.kind !== Kind.STRING) {
      throw new Error('ObjectIdScalar can only parse string values');
    }

    return Types.ObjectId(ast.value);
  },
});

export default ObjectIdScalar;
