## GraphQL Playground
GraphQL playground available at <http://localhost:3000/playground>.

## REST API Documentation 
Swagger UI available at <http://localhost:3000/documentation>.

### Postman collection *[optional]*
Postman collection can be found and imported from
http://127.0.0.1:3000/documentation/json after running the project.

From [Postman's environment variables](https://learning.postman.com/docs/sending-requests/managing-environments/)
settings, you need to add `baseUrl` = `127.0.0.1:3000`

## Need to know
The `src/models/Car.ts` is a model file that contains classes which are shared
with Mongoose, Swagger, and GraphQL. So this basically
means that the "regular way" of defining schemas for Mongoose, Swagger and
GraphQL is done in separate files which makes it hard to keep it sync and it is
not the way I prefer. So to understand the "single schema for all" terminology,
better look at the libraries that are used to create a schema structure.
- [Typegoose](https://typegoose.github.io/)
- [TypeGraphQL](https://typegraphql.com/)
- [ts-json-schema-generator](https://npmjs.com/package/ts-json-schema-generator)
