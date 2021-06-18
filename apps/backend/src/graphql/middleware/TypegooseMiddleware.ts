import { Model, Document } from 'mongoose';
import { getClassForDocument } from '@typegoose/typegoose';
import { MiddlewareFn } from 'type-graphql';

function tryToConvertDocument(doc: Document) {
  if (!(doc instanceof Model)) return doc;

  const registeredTypegooseClass = getClassForDocument(doc);

  if (!registeredTypegooseClass) return doc;

  const plainDoc = doc.toObject();

  Object.setPrototypeOf(plainDoc, registeredTypegooseClass.prototype);

  return plainDoc;
}

const typegooseMiddleware: MiddlewareFn = async (_, next) => {
  const value = await next();

  if (Array.isArray(value))
    return value.map(item => tryToConvertDocument(item));

  return tryToConvertDocument(value);
};

export default typegooseMiddleware;
