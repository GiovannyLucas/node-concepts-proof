module.exports = {
  type: process.env.DB_PG_TYPE,
  host: process.env.NODE_ENV === 'test' ? 'localhost' : process.env.DB_PG_HOST,
  port: Number(process.env.DB_PG_PORT),
  username: process.env.DB_PG_USER,
  password: process.env.DB_PG_PASS,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_PG_NAME?.concat('_test')
      : process.env.DB_PG_NAME,
  entities: ['./src/modules/**/infra/typeorm/entities/**.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
