import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = { name, email, password: hashedPassword };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ success: true, user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const buyCredit = async (req,res) =>{
  try {
    const {userId} = req.body
    const user = await userModel.findById(userId);
    res.status(200).json({success:true, user: {name: user.name, credit: user.creditBalance}})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const AddCredit = async (req,res) =>{
  try {
    const {userId,input} = req.body
    const user = await userModel.findById(userId);
    user.creditBalance += input
    user.save()
    res.status(200).json({success:true, user: {name: user.name, credit: user.creditBalance}})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


export { registerUser , loginUser , buyCredit , AddCredit };
