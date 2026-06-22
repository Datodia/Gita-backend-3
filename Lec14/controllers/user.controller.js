
const UserService = require('../services/user.service')

exports.getAllUsers = async (req, res) => {
  const ip = req.ip;
  console.log(ip, "ip");
  let users = await UserService.getAllUsers(req.query)
  res.json(users);
};


exports.createUser = async (req, res) =>{
    if (
    !req.body ||
    !req.body.name ||
    !req.body.age ||
    !req.body.hasOwnProperty("isSmoker")
  ) {
    return res
      .status(400)
      .json({ message: "name age and isSmoker is required" });
  }

  const newUser = await UserService.createUser(req.body)

  res.status(201).json({ success: true, data: newUser });
}


exports.getUserById = async (req, res) => {
    const id = Number(req.params.id);
    const user = await UserService.getUserById(id)
    if(!user){
        return res.status(404).json({message: "user not found"})
    }
    res.json(user);
}


exports.deteleUserById = async (req, res) => {
    const id = Number(req.params.id);
    const deletedUser = await UserService.deleteUserById(id, req.headers)
    if(!deletedUser){
        return res.status(404).json({message: "user not found"})
    }

    if(deletedUser === 'PERMITION_DENIED'){
        return res.status(403).json({message: "only admin can do"})
    }

    res.json({ success: true, data: deletedUser });
}


exports.updateUserById = async (req, res) => {
    const id = Number(req.params.id);
    const updatedUser = await UserService.updateUserById(id, req.body)
    if(!updatedUser){
        return res.status(404).json({message: "user not found"})
    }

    res.json({ success: true, data: updatedUser });
}