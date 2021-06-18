import { astFromValue, GraphQLInt, GraphQLString } from 'graphql';
import { Types } from 'mongoose';
import ObjectIdScalar from './ObjectId.scalar';

describe('Test ObjectIdScalar', () => {
  it('"serialize" should fail', () => {
    expect(() => ObjectIdScalar.serialize('An object id')).toThrowError();
  });

  it('"serialize" should return hex string', () => {
    const id = '60827fa7cb29ef1f30fc5f13';

    expect(ObjectIdScalar.serialize(Types.ObjectId(id))).toBe(id);
  });

  it('"parseValue" should fail', () => {
    expect(() => ObjectIdScalar.parseValue(null)).toThrowError();
  });

  it('"parseValue" should return mongoose object id', () => {
    const id = '60827fa7cb29ef1f30fc5f13';

    expect(ObjectIdScalar.parseValue(id)).toStrictEqual(Types.ObjectId(id));
  });

  it('"parseLiteral" should fail', () => {
    const ast = astFromValue(123, GraphQLInt);

    expect(ast).toBeTruthy();

    if (!ast) return;

    expect(() => ObjectIdScalar.parseLiteral(ast, null)).toThrowError();
  });

  it('"parseLiteral" should return mongoose object id', () => {
    const id = '60827fa7cb29ef1f30fc5f13';
    const ast = astFromValue(id, GraphQLString);

    expect(ast).toBeTruthy();

    if (!ast) return;

    expect(ObjectIdScalar.parseLiteral(ast, null)).toStrictEqual(
      Types.ObjectId(id),
    );
  });
});
