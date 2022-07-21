import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import chalk from 'chalk';
import log from 'gulog';
import cors from 'cors';

import apiLimiter from './middlewares/apiLimiter.js';
import { router } from './routes/index.js';
import Errors from './util/error.js';



export const {sendError} = new Errors(); 
export const app = express();


app.use(morgan('dev'));
app.use(express.json())
app.use(helmet());
app.use(cors())

app.use('/v1', [apiLimiter], router);


app.use((err, req, res) =>  {
    
    if (err.isCustomError === true) return sendError(res, err.message);
    log.error(`An error ocurred at route ${chalk.red(req.originalUrl)}:`);
    console.log(err);
    return sendError(res, 'internal_error');
    
});


