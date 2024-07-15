
const mongoose=require("mongoose")

const connectDb=async()=>{
    try {
       await mongoose.connect("mongodb+srv://gowtham:NF1rRgKjeCNwUkU5@cluster0.fknltqr.mongodb.net/BitcoinDb?retryWrites=true&w=majority&appName=Cluster0")
    } catch (error) {
        console.log(error);
    }
}

export default connectDb