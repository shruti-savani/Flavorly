const User = require('../models/User')
const OnlineOrder = require('../models/OnlineOrder')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const secret = process.env.SECRET;

const createToken = (_id) => {
    return jwt.sign({_id}, secret, {expiresIn: '3d' })
}

module.exports.signup_post = async (req, res) => {
    const {name, phone, password} = req.body;
    try{
        const user = await User.signup({name, phone, password});
        const token = createToken(user._id);
        res.status(200).json({phone, token});
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.login_post = async (req, res) => {
    const {phone, password} = req.body;

    try{
        const user = await User.login({ phone, password});
        const token = createToken(user._id);
        res.status(200).json({phone, token});
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.user_get = async (req, res) => {

    try {
        const userId = req.params.id; 
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const userDetails = {
          name: user.name,
          phone: user.phone,
        };
    
        res.status(200).json(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

module.exports.user_details_edit = async (req, res) => {
  const UserId = req.params.id;
  const {name, phone} = req.body;

  try{
    const user = await User.findById(UserId)

    if(!user) {
      return res.status(404).json({error: "User not found!"})
    }

    user.name = name;
    user.phone = phone;

    await user.save({validateBeforeSave: false})


    // User.findByIdAndUpdate(UserId, {name, phone})
    res.status(200).send( "Successfully updated the user information" );
  }
  catch (error) {
    res.status(400).json({error: error.message})
  }

}

module.exports.online_order_get = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const orders = await OnlineOrder.find({user_id: userId});
      console.log("order details", orders);
      res.status(200).json(orders);
    }
    catch (err) {
      res.status(404).json({err: err.message});
    }
  
  }