import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors"
import connectDb from './config/db';
import fetchBitcoinData from './controllers/cryptoController';
import bitcoinRouter from './routes/cryptoRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


connectDb()

app.use("/api/crypto",bitcoinRouter)

setInterval(fetchBitcoinData,15000)

mongoose.connection.once("open",()=>{
  console.log("Db conneted");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})

mongoose.connection.on("error",(err)=>{
  console.log(err);
})