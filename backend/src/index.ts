import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import itemsRoute from './routes/itemsRoute';
import menusRoute from './routes/menusRoute'
import { METHODS } from "node:http";



dotenv.config()

const app = express()

const corsOption = {
     origin: process.env.CLIENT_URL ?? "http://localhost:5173",
     credentials:true,
     methods: ['GET','POST','DELETE','PUT','PATCH']
}
app.use(cors(corsOption));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes

app.use('/api/menus',menusRoute);
app.use('/api/items',itemsRoute)

const PORT = Number(process.env.PORT) || 3000;

connectDB().then(()=>{
     app.listen(PORT,()=>{
          console.log(` Server running on http://localhost:${PORT}`)
     })
})