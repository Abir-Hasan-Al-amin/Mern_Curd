import dotenv from "dotenv"
import connectDB from './db/index.js'
import {app} from './app.js'
dotenv.config();

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log(error);
        throw error;
    });
    const PORT=process.env.PORT||8000;
    app.listen(PORT,()=>{
        console.log(`Server is running at port : ${PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB Connection failed",err);
})