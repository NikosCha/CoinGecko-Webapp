import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { createServer } from 'http';
import { Request, Response } from 'express';

import api_v1 from './api_v1';
import ErrorService from './shared/error.service';

// express application
const app = express();
const server = createServer(app);

app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: "http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'X-Requested-With'],
  })
);

// parse body params and attach them to res.body
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


// all API versions are mounted here within the app
app.use('/api', api_v1);

app.use(ErrorService.handler);

app.use(morgan('dev'));


server.listen(3001, () => {
  console.info(`server started on port 3001`);
});


export default app;
