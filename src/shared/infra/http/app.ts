import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

createConnection();

const app = express();

app.use(express.json());
app.use(cors());

export { app };
