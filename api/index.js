
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.routes.js'
import cookieParser from "cookie-parser";
import path from 'path'


dotenv.config()

mongoose
    .connect(process.env.MONGO
        
    )
    .then(() => console.log("Database is connected :D "))
    .catch((err) => {
        console.log(err);
    });

const __dirname = path.resolve()  

const app = express();

app.use(express.json()) // to allow the the app to use json format 

app.use(cookieParser()) // for extracting cookie from the browser


app.listen(3000, () => {
    console.log("server is running on port 3000 :)");
});


app.get('/test', (req, res)=>{
    res.json({message:'api is working'})
})



app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment',commentRoutes)

app.use(express.static(path.join(__dirname, 'client/dist')))


//if the addresses do not match above ones 
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})