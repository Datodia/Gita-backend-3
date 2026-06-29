const { readFile, writeFile } = require("../utils/fs.util");
const user2Model = require("./user2.model");


exports.getAllUsers2 = async (query) => {
    const filter = {}
    if ('ageFrom' in query) {
      filter['age'] = {
        ...filter['age'],
        '$gte': Number(query.ageFrom)
      }
    }

    if ('ageTo' in query) {
      filter['age'] = {
        ...filter['age'],
        '$lte': Number(query.ageTo)
      }
    }

    if('isSmoker' in query){
      filter['isSmoker'] = Number(query.isSmoker) ? true : false
    }

    if('name' in query){
      filter['name'] = new RegExp(`^${query.name}`)
    }

    if('email' in query){
      filter['email'] = new RegExp(`^${query.email}`)
    }

    const users = await user2Model.find(filter).populate('posts', 'title desc')
    return users
}

exports.getUserById2 = async (id) => {
    const user = await user2Model.findById(id)
    if (!user) {
        return null
    }

    return user
}

exports.deleteUserById2 = async (id) => {
    const deletedUser = await user2Model.findByIdAndDelete(id)

    if(!deletedUser){
      return null
    }

    return deletedUser
}


exports.updateUserById2 = async (id, body) => {
    
  const updatedUser = await user2Model.findByIdAndUpdate(id, {
    ...body,
    $inc: { __v: 1 },
  }, {new: true})

  if(!updatedUser){
    return null
  }

  return updatedUser
}