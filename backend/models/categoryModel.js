import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    /* unique:true, */
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
    trim:true,
  },
  parent:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
    default:null,
  },
  status:{
    type:String,
    enum:['active','inactive'],
    default:'active'
  }
},{timestamps:true})

categorySchema.index({name:1,parent:1},{unique:true})

categorySchema.pre('save', function() {
  const parentPart = this.parent ? this.parent.toString() : '';
  this.slug = slugify(`${parentPart}-${this.name}`, { lower: true });
});

const Category=mongoose.model('Category',categorySchema);
export default Category;