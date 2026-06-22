const { readFile, writeFile } = require("../utils/fs.util");


exports.getAllUsers = async (query) => {
    let users = await readFile("users.json", true);
    if (query.ageFrom) {
        users = users.filter((user) => user.age > Number(query.ageFrom));
    }

    if (query.ageTo) {
        users = users.filter((user) => user.age < Number(query.ageTo));
    }

    return users
}

exports.createUser = async (body) => {
  const users = await readFile("users.json", true);
  const lastId = users[users.length - 1]?.id || 0;

  const newUser = {
    id: lastId + 1,
    name: body.name,
    age: body.age,
    isSmoker: body.isSmoker,
  };
  users.push(newUser);
  await writeFile("users.json", users);

  return newUser
}


exports.getUserById = async (id) => {
    const users = await readFile("users.json", true);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        return null
    }

    return users[index]
}

exports.deleteUserById = async (id, headers) => {
    const users = await readFile("users.json", true);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        return null
    }

    const role = headers["role"];
    if (!role || role !== "ADMIN") {
        return 'PERMITION_DENIED'
    }

    const deletedUser = users.splice(index, 1);
    await writeFile("users.json", users);

    return deletedUser[0]
}


exports.updateUserById = async (id, body) => {
    const users = await readFile("users.json", true);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null
  }

  const updateReq = {};
  if (body.name) {
    updateReq["name"] = body.name;
  }
  if (body.age) {
    updateReq["age"] = body.age;
  }
  if (body.hasOwnProperty("isSmoker")) {
    updateReq["isSmoker"] = body.isSmoker;
  }

  users[index] = {
    ...users[index],
    ...updateReq,
  };

  await writeFile("users.json", users);

  return users[index]
}