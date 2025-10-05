import mongoose, { Schema } from 'mongoose'

const urlSchema=new Schema({
   shortUrl:{
      type:String,
      unique:true
   },
   redirectUrl:{
      type:String,
      unique:true,
      required:true
   },
   clicks:[
      {
         timestamp:{
            type:Date,
            default:Date.now
         }
      }
   ]
},{timestamps:true})

const Url=mongoose.model('Url',urlSchema)
export default Url;