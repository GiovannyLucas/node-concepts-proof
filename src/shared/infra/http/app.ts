import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { createConnection } from 'typeorm';

import '../../container';
import { router } from './routes';

const typeormConnection = createConnection();

typeormConnection.then((connection) => {
  connection.runMigrations();
});

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

export { app };
