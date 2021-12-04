module.exports = {
  type: process.env.DB_PG_TYPE,
  host: process.env.DB_PG_HOST,
  port: +process.env.DB_PG_PORT,
  username: process.env.DB_PG_USER,
  password: process.env.DB_PG_PASS,
  database: process.env.DB_PG_NAME,
  entities: [
    "./src/modules/**/infra/typeorm/entities/**.ts"
  ],
}