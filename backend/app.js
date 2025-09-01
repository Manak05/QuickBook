import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection} from './database/dbConnection.js';
import { errorMiddleware } from "./error/error.js";
import reservationRouter from './routes/reservationRoute.js';

const app = express();
dotenv.config({path:"./config/config.env"});

app.use(
    cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials:true,
})
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    console.log("METHOD:", req.method);
    console.log("URL:", req.url);
    console.log("HEADERS:", req.headers["content-type"]);
    console.log("BODY:", req.body);
    next();
});

app.use("/api/v1/reservation", reservationRouter);

dbConnection();

app.use(errorMiddleware);
export default app;
