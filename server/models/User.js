const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});


UserSchema.statics.signup = async function({name, phone, password}) {

  if(!name || !phone || !password) {
    throw Error('All fields must be filled');
  }
  if(!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }
  if(phone.length !== 10) {
    throw Error('Length of phone number should be 10 digits')
  }
  if(!validator.isNumeric(phone)) {
    throw  Error('Invalid Phone Number')
  }

  const UserModel = this.model('User');
  const exists = await UserModel.findOne({phone})

  if(exists){
    throw Error( "Phone Number already in use" )
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await UserModel.create({name, phone, password: hash});

  return user;
}

UserSchema.statics.login = async function({phone, password}) {

  if(!phone || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({phone})

  if(!user){
    throw Error( "Incorrect Phone Number" )
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match) {
    throw Error("Incorrect Password")
  }

  return user;

}

const User = mongoose.model('User', UserSchema);

module.exports = User;
