import initApp, { connectDB } from './app';
import { APP_PORT, DB_HOST, DB_NAME, DB_PORT } from './config';

if (!APP_PORT) throw Error('Missing port number for the server');

const { NODE_ENV } = process.env;

const app = initApp({
  logger: NODE_ENV === 'production' ||
    NODE_ENV === 'test' || {
      prettyPrint: {
        ignore: 'pid,hostname',
        translateTime: 'HH:MM:ss',
      },
    },
});

(async () => {
  try {
    console.info('Connecting MongoDB...');
    await connectDB(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

    console.info('MongoDB connected!');

    await app.listen(APP_PORT, '0.0.0.0');

    app.swagger();
  } catch (err) {
    app.log.error(err);
  }
})();
