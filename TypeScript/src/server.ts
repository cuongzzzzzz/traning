import express, { NextFunction, Request, Response } from 'express';
import mongoInit from './db/mongo.init';
import compression from "compression";
import bodyParser from "body-parser";
import router from './routers/job.router';
import helmet from 'helmet';
import { ErrorResponse } from './responses';

const app = express();
app.use(compression())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000;

mongoInit.getInstance()

app.use(router)



app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorResponse(404, "Not found")
    next(error)
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {

    res.status(err.status || 500).json({
        status: "error",
        message: err.message || "Internal Server Error",
        stack: err.stack,
        statusCode: err.status
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});