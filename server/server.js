import app from "./app.js";
import { connectDB } from "./config/database.js";


//Connect Database
connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port: ${process.env.PORT}`);
})