const user2Model = require("../users/user2.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.signUp = async ({ name, age, email, password, isSmoker }) => {
  const existUser = await user2Model.findOne({ email });
  if (existUser) {
    return 'ALREADY_EXISTS'
  }

  const hashedPass = await bcrypt.hash(password, 10);
  await user2Model.create({
    name,
    age,
    isSmoker,
    email,
    password: hashedPass,
  });

  return 'OK'
};


exports.signIn = async ({email, password}) => {

    const existUser = await user2Model.findOne({email}).select('+password')
    if(!existUser){
        return 'INVALID_CREDENTIALS'
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password)
    if(!isPassEqual){
        return 'INVALID_CREDENTIALS'
    }

    const payLoad = {
        userId: existUser._id
    }

    const accessToken = await jwt.sign(payLoad, process.env.JWT_SECRET, {expiresIn: '1h'})

   return accessToken
}

exports.currentUser = async (userId) => {
    const existsUser = await user2Model.findById(userId)
    return existsUser
}