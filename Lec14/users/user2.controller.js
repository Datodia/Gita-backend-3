const { Router } = require("express");
const UserService = require("./user2.service");
const isAdminMiddleware = require("../middlewares/is-admin.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const userRouter2 = new Router();

userRouter2.get("/", roleMiddleware(['viewer', 'editor', 'admin']) ,async (req, res) => {
  const ip = req.ip;
  console.log(ip, "ip");
  let users = await UserService.getAllUsers2(req.query);
  res.json(users);
});

userRouter2.post("/", roleMiddleware(['editor', 'admin']), async (req, res) => {
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

  const newUser = await UserService.createUser2(req.body);

  res.status(201).json({ success: true, data: newUser });
});



userRouter2.get('/:id', roleMiddleware(['viewer','editor', 'admin']), async (req, res) => {
    const id = Number(req.params.id);
    const user = await UserService.getUserById2(id)
    if(!user){
        return res.status(404).json({message: "user not found"})
    }
    res.json(user);
})


userRouter2.delete('/:id', roleMiddleware([ 'admin']), async (req, res) => {
    const id = Number(req.params.id);
    const deletedUser = await UserService.deleteUserById2(id, req.headers)
    if(!deletedUser){
        return res.status(404).json({message: "user not found"})
    }

    if(deletedUser === 'PERMITION_DENIED'){
        return res.status(403).json({message: "only admin can do"})
    }

    res.json({ success: true, data: deletedUser });
})


userRouter2.put('/:id', roleMiddleware(['editor', 'admin']), async (req, res) => {
    const id = Number(req.params.id);
    const updatedUser = await UserService.updateUserById2(id, req.body)
    if(!updatedUser){
        return res.status(404).json({message: "user not found"})
    }

    res.json({ success: true, data: updatedUser });
})


module.exports = userRouter2;
