import { createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'compass_test_database') => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'compass_uol_test'
          : defaultOptions.database,
    }),
  );
};
