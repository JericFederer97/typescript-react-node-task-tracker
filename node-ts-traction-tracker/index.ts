// const express = require('express');
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

// * Instantiate express app
const app: Express = express();
dotenv.config();

// * Parse request Body
/*
Request body would be attached to incoming request as a body property.
Body parser will also process the incoming json and convert it to a JavaScript object.
*/
app.use(bodyParser.json());

// * Use CORS install types as well
/*
Now course stands for Cross-origin resource sharing.
By default, a server follows a strict course policy, which means that if the incoming request has
a different origin and the origin is not same to the server, the server will not respond.
We don't want this to happen since we are building a rest API, and the front end of our application
will query this API. The origin is not going to be same as the server, so we need to disable course in this case.
*/
app.use(cors());

// * Create DB connection
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [Task],
    // ! synchronize should be turned off during production
    synchronize: true,
});

// * Define server port
const port = process.env.PORT;

// * Initialize connection to DB
// ? Returns a promise
AppDataSource.initialize()
    .then(() => {
        // * Start listening to the requests on the defined port
        app.listen(port);
        console.log('Data source has been initialized.')
    }).catch((err) => {
        console.error(
            'Error during data source initialization.',
            err,
        )
    });

// * Routes
app.use('/', tasksRouter);