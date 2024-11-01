const fs = require("fs");
const path = require("path");

const dataUsers = {
  filePath: path.join(__dirname, '../data/users.json'),

  load() {
    const users =  fs.readFileSync(this.filePath, "utf-8");
    //transformamos el json a un array de objetos
    const usersJson = JSON.parse(users);
    return usersJson;
  },
  save(data) {
    const jsonData = JSON.stringify(data, null, ' ');
    
    fs.writeFileSync(this.filePath, jsonData, "utf-8");
  },
  //update jscon file
  update(data) {
    let users = this.load();
    users = users.filter((user) => user.id !== data.id);
    users.push(data);
    this.save(products);
    
  },
  findProductById(id) {
    const users = this.load();
    const user = users.find((user) => usert.id === id);
    return user;
  }, 
  findUserByUsername(username) {
    const users = this.load();
    const user = users.find((user) => user.username === username);
    return user;
  },
  findByEmail(email) {
    const users = this.load();
    const user = users.find((user) => user.email === email);
    return user;
  }
};

module.exports = dataUsers;