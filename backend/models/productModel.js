import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true,
  },
  slug:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
  },
  description:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  discount:{
    type:Number,
    default:0,
  },
  stock:{
    type:Number,
    required:true,
  },
  category:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Category',
  required:true,
  },
  images:[
    {type:String}
  ],
  status:{
    type:String,
    enum:['active','inactive'],
    default:'active',
  }

},{timestamps:true})
const Product=mongoose.model('Products',productSchema);
export default Product;