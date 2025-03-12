const mongoose=require("mongoose");

const MONGO_URI= process.env.MONGO_URI;

const connectDB= async()=>{
    await mongoose.connect(MONGO_URI).then(()=>{
        console.log("Database is connected");
    });
};
   
module.exports=connectDB;