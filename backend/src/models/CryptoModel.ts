import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";

export interface IBitcoin extends Document {
    code: string;
    rate: number;
    volume: number;
    cap: number;
    delta: {
      hour: number;
      day: number;
      week: number;
      month: number;
      quarter: number;
      year: number;
    };
    createdAt?: Date; // Optional timestamp field
  }

const bitcoinSchema = new Schema({
    code:{required:true,type:String},
    rate:{required:true,type:Number},
    volume:{required:true,type:Number},
    cap:{required:true,type:Number},
    /* delta:{
        hour:{required:true,type:Number},
        day:{required:true,type:Number},
        week:{required:true,type:Number},
        month:{required:true,type:Number},
        quarter:{required:true,type:Number},
        year:{required:true,type:Number},
    }, */
    createdAt:{type:Date,default:() => new Date()}
},{
    timestamps:true
})

const BitcoinModel =  mongoose.model("Bitcoin",bitcoinSchema)

export default BitcoinModel;