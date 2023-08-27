import express from 'express'
import {config} from 'dotenv'
import ErrorMiddleware from './middlewares/Error.js';
const app = express();

config({
    path:"./config/config.env"
})


//using middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true,}))


//importing Routes
import course from './routes/courseRoutes.js'
import user from './routes/userRoutes.js'

app.use("/api/v1",course)
app.use("/api/v1",user)

export default app;


app.use(ErrorMiddleware)