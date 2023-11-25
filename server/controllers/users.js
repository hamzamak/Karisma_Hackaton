
import User from "../models/user.js"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


export const SignIn = async (req, res) => {
   const { username, password} = req.body;
   if(!username || !password) {
      return  res.status(400).json({ message: 'All required fields must be provided.' });
   }
  
   try {
      const existingUser = await User.findOne({ username })
      if (!existingUser) return res.status(404).json({ message: "User not found" });
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credential !" });
      const token = jwt.sign({
         payload: existingUser
      },
         process.env.SECRET,
         {
            expiresIn: '10h'
         })
   
         res.status(200).json(token);

   } catch (error) {
      res.status(500).json({ "message": error })
   }
}


export const SignUp = async (req, res) => {
   const {username, password } = req.body;
   

   try {
      const existingUser = await User.findOne({ username })
      if (existingUser) return res.status(400).json({ message: "Try another username (taken)" });

      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await User.create(
         { username, password: hashedPassword  }
      )
      const token = jwt.sign({
         payload :result
      },
      process.env.SECRET,
         {
            expiresIn: '20h'
         })
      res.status(200).json(  token );

   } catch (error) {
      res.status(500).json({ "message": error.message })
   }
}




