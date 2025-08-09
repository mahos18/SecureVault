const UserModel = require('../models/user');
const VaultModel = require("../models/vault");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const signupcontroll= async (req, res) => {
    
    
    try {
        const { name, email, password } = req.body;
        const user= await UserModel.findOne({email});
        if (user){
         return res.status(409).json({message:"Email already Registered ",success:false});
        }   
        const key = crypto.randomBytes(32).toString('hex');
        const userModel= new UserModel({name, email, password,key});
        userModel.password = await bcrypt.hash(password, 5);
        await userModel.save();
        res.status(201).json({message:"User registered successfully",success:true});
    }catch (error) {
        res.status(500).json({message:"Internal server error"+error,success:false});
    }
}

const logincontroll = async (req, res) => {
    
    
    try {
        const { email, password } = req.body;
        const checkaccount= await UserModel.findOne({email});
        const errmsg="Authentication Failed,Please check your email and password";
        if (!checkaccount){
         return res.status(403).json({message:errmsg,success:false});
        }   
        const isMatch = await bcrypt.compare(password, checkaccount.password);
        if(!isMatch) {
            return res.status(403).json({message:errmsg,success:false});
        }
        const jwtoken=jwt.sign(
            {email:checkaccount.email,_id:checkaccount._id},
            process.env.JWT_SECRET,
            ({expiresIn:process.env.JWT_EXPIRE})
        )
        res.status(200).json({
            message:"Login successful",
            success:true,
            token:jwtoken,
            user:{
                name:checkaccount.name,
                email:checkaccount.email,
                aes_key:checkaccount.key,
                user_id:checkaccount._id

              
            }
        })
    }catch (error) {
        res.status(500).json({message:"Internal server error"+error,success:false});
    }
}



const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 5);
    user.password = hashedPassword;
    await user.save();

    
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    
    const mailOptions = {
      from: `"Secure App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Temporary Password',
      html: `
        <p>Hello ${user.username || 'User'},</p>
        <p>Your new temporary password is: <strong>${tempPassword}</strong></p>
        <p>Please log in and change your password immediately.</p>
      `
    };

    
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: 'Temporary password sent to your email.',
      success: true
    });

  } catch (error) {
    console.error('NodeMailer Error:', error);
    res.status(500).json({
      message: 'Internal server error: ' + error.message,
      success: false
    });
  }
};



module.exports = { signupcontroll, logincontroll,forgotPasswordController };