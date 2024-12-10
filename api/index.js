
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"


dotenv.config()

mongoose
    .connect(process.env.MONGO
        
    )
    .then(() => console.log("Database is connected :D "))
    .catch((err) => {
        console.log(err);
    });
const app = express();
app.use(express.json()) // to allow the the app to use json format 

app.listen(3000, () => {
    console.log("server is running on port 3000 :)");
});


app.get('/test', (req, res)=>{
    res.json({message:'api is working'})
})



app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)