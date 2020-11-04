import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Logger } from './infrastructure/logger';

Logger.setupConsole();

dotenv.config();
console.log('env', process.env.NODE_ENV);

const server = express();
const PORT = process.env.PORT;
const VERSION = process.env.VERSION;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors())
server.disable('x-powered-by');

server.use(require('./controllers'));

server.get('/', (_, res) => {
  res.send(`API version ${VERSION}`).end();
});

server.listen(PORT, () => {
  console.log({ message: `API is running at ${PORT}`, version: VERSION});
});
