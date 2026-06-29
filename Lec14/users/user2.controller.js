const { Router } = require("express");
const UserService = require("./user2.service");
const isAdminMiddleware = require("../middlewares/is-admin.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const isValidMongoIdMiddleware = require("../middlewares/is-valid-mongo-id.middleware");

const userRouter2 = new Router();

userRouter2.get("/" ,async (req, res) => {
  const ip = req.ip;
  console.log(ip, "ip");
  let users = await UserService.getAllUsers2(req.query);
  res.json(users);
});

userRouter2.get('/:id', isValidMongoIdMiddleware, roleMiddleware(['viewer','editor', 'admin']), async (req, res) => {
    const user = await UserService.getUserById2(req.params.id)
    if(!user){
        return res.status(404).json({message: "user not found"})
    }
    res.json(user);
})


userRouter2.delete('/:id', isValidMongoIdMiddleware, roleMiddleware([ 'admin']), async (req, res) => {
    const deletedUser = await UserService.deleteUserById2(req.params.id)
    if(!deletedUser){
        return res.status(404).json({message: "user not found"})
    }

    res.json({ success: true, data: deletedUser });
})


userRouter2.put('/:id', isValidMongoIdMiddleware, roleMiddleware(['editor', 'admin']), async (req, res) => {
    const updatedUser = await UserService.updateUserById2(req.params.id, req.body)
    if(!updatedUser){
        return res.status(404).json({message: "user not found"})
    }

    res.json({ success: true, data: updatedUser });
})


module.exports = userRouter2;
