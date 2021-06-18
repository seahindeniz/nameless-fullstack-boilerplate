import type { SwaggerOptions } from 'fastify-swagger';

export default <SwaggerOptions>{
  routePrefix: '/documentation',
  exposeRoute: true,
  openapi: {
    info: {
      title: 'Cars API',
      description:
        'Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger',
      version: '0.0.1',
    },
    tags: [
      {
        name: 'cars',
        description: 'Car related end-points',
      },
    ],
  },
};
