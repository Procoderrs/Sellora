import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs';

const createAdmin=async()=>{
  try {
    const adminEmail=process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const adminExists=await User.findOne({email:adminEmail});
    if(!adminExists){
      const hashed=await bcrypt.hash(adminPassword,10);
      await User.create({
        name:'Admin',
        email:adminEmail,
        password:hashed,
        role:'admin',
      });
            console.log("✅ Admin user created:",adminEmail , adminPassword);
    }
    else{
      console.log('admin already exists');
    }

  } catch (error) {
    console.log('error creating admin',error);
  }
}

export default createAdmin;