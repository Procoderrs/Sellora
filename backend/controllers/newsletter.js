import newsletter from '../models/newsletter.js';

export const subscribeNewsLetter=async(req,res)=>{
  try {
    const {email}=req.body;

    if(!email){
  return res.status(400).json({message:'email is required'});
    }
    const normalizedEmail=email.toLowerCase().trim();
    const existing=await newsletter.findOne({email:normalizedEmail});
    
    if(existing){
      return res.status(409).json({message:'Already subscribed'});
    }

    const subscriber=await newsletter.create({email:normalizedEmail})
    res.status(201).json({message:'subscribed successfully',subscriber});
  } catch (error) {
    console.log('newsletter error',error);
    res.status(500).json({message:'server error',error})
  }
}





