import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()

async function dbconnect() {
   await mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
      console.log('DB Connected Successfully')
   }).catch(err=>console.log(err.message))
}

export default dbconnect;