import axios from "axios";
import BitcoinModel, { IBitcoin } from "../models/CryptoModel";
import { Request, Response } from "express";


//Fetch Bitcoin data and store in MongoDb
async function fetchBitcoinData(){
    const body =  JSON.stringify({ codes: [ "BTC","BNB","SOL","USDT","ETH"],currency: "USD",sort: "rank",order: "ascending",offset: 0,limit: 5,meta: false,});
    const options= {headers:{"Content-type":"application/json"
        , "x-api-key": "4ec691e4-8798-4516-b782-936c3abcde73",}}
    const response = await axios.post("https://api.livecoinwatch.com/coins/list",body,options)
    const res=await response.data;
    await Promise.all(res.map(async(data:IBitcoin)=>await BitcoinModel.create({...data})))
}


//getData from DB with code
export const getBitCoinData=async(req:Request,res:Response)=>{
    const {coinCode}=req.body;
    try {
      const bitcoinData =  await BitcoinModel.find({code:coinCode}).sort({createdAt:1}).limit(20);
      if (!bitcoinData) {
        return res.status(404).json({ error: 'Bitcoin data not found' });
      }
      res.status(200).json(bitcoinData);
      
    } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getBitCoinDatacode=async(req:Request,res:Response)=>{
    const {coinCode}=req.params;
    
    try {
      const bitcoinData =  await BitcoinModel.find({code:coinCode}).sort({createdAt:-1}).limit(50);
      if (!bitcoinData) {
        return res.status(404).json({ error: 'Bitcoin data not found' });
      }
      res.status(200).json(bitcoinData);
      
    } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



//update Bitcoin Data
export const updateBitcoindata = async (req: Request, res: Response) => {
  const { id, ...updateData } = req.body; 
  try {
    if (!id) {
      return res.status(400).json({ error: 'ID is required for updating' });
    }

    const updatedBitcoinData = await BitcoinModel.findByIdAndUpdate(
      id, 
      { $set: updateData }, 
      { new: true, runValidators: true } 
    );

    if (!updatedBitcoinData) {
      return res.status(404).json({ error: 'Bitcoin data not found' });
    }

    res.status(200).json(updatedBitcoinData);
  } catch (error) {
    console.error('Error updating Bitcoin data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Delete BitCoin
export const deleteBitcoindata = async (req: Request, res: Response) => {
  const { id } = req.body; 
  
  try {
    if (!id) {
      return res.status(400).json({ error: 'ID is required for deletion' });
    }
    const deletedCoin = await BitcoinModel.findByIdAndDelete(id);
    if (!deletedCoin) {
      return res.status(404).json({ error: 'Bitcoin data not found' });
    }
    res.status(200).json(deletedCoin);
  } catch (error) {
    console.error('Error deleting Bitcoin data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export default fetchBitcoinData;