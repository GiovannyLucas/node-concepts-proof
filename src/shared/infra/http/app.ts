import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

const typeormConnection = createConnection();

typeormConnection.then((connection) => {
  connection.runMigrations();
})

const app = express();

app.use(express.json());
app.use(cors());

export { app };
