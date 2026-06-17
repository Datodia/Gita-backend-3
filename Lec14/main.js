const express = require("express");
const { readFile, writeFile } = require("./utils/fs.util");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1 style="color: red;">hello world</h1>');
});

app.get("/chess", (req, res) => {
  console.log(req.headers["user-agent"]);
  res.redirect("https://chess.com");
});

app.get("/secret", (req, res) => {
  const secret = req.headers["secret"];
  if (!secret || secret !== "key123") {
    return res.status(403).json({ message: "permition denied" });
  }
  res.send("random secret info");
});

app.get("/users", async (req, res) => {
  const ip = req.ip;
  console.log(ip, "ip");
  let users = await readFile("users.json", true);
  if (req.query.ageFrom) {
    users = users.filter((user) => user.age > Number(req.query.ageFrom));
  }

  if (req.query.ageTo) {
    users = users.filter((user) => user.age < Number(req.query.ageTo));
  }
  res.json(users);
});

app.post("/users", async (req, res) => {
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

  const users = await readFile("users.json", true);
  const lastId = users[users.length - 1]?.id || 0;

  const newUser = {
    id: lastId + 1,
    name: req.body.name,
    age: req.body.age,
    isSmoker: req.body.isSmoker,
  };
  users.push(newUser);
  await writeFile("users.json", users);

  res.status(201).json({ success: true, data: newUser });
});

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const users = await readFile("users.json", true);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "user not found" });
  }

  res.json(users[index]);
});

app.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const users = await readFile("users.json", true);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "user not found" });
  }

  const role = req.headers["role"];
  if (!role || role !== "ADMIN") {
    return res.status(401).json({ message: "only admin can do that" });
  }

  const deletedUser = users.splice(index, 1);
  await writeFile("users.json", users);
  res.json({ success: true, data: deletedUser[0] });
});

app.put("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const users = await readFile("users.json", true);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "user not found" });
  }

  const updateReq = {};
  if (req.body.name) {
    updateReq["name"] = req.body.name;
  }
  if (req.body.age) {
    updateReq["age"] = req.body.age;
  }
  if (req.body.hasOwnProperty("isSmoker")) {
    updateReq["isSmoker"] = req.body.isSmoker;
  }

  users[index] = {
    ...users[index],
    ...updateReq,
  };

  await writeFile("users.json", users);
  res.json({ success: true, data: users[index] });
});

app.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});
