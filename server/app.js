import express from 'express'
import cookieParser from 'cookie-parser';
import {config} from 'dotenv'
import ErrorMiddleware from './middlewares/Error.js';
import cors from 'cors';

const app = express();

config({
    path:"./config/config.env"
})


//using middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors());



//importing Routes
import course from './routes/courseRoutes.js'
import user from './routes/userRoutes.js'
import payment from './routes/paymentRoutes.js'

app.use("/api/v1",course)
app.use("/api/v1",user)
app.use("/api/v1",payment)

export default app;


app.use(ErrorMiddleware)