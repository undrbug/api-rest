const fs = require("fs");
const path = require("path");

const datasource = {
  filePath: path.join(__dirname, '../data/wines.json'),

  load() {
    const products =  fs.readFileSync(this.filePath, "utf-8");
    //transformamos el json a un array de objetos
    const productsJson = JSON.parse(products);
    return productsJson;
  },
  save(data) {
    const jsonData = JSON.stringify(data, null, ' ');
    fs.writeFileSync(this.filePath, jsonData, "utf-8");
  },
  //update jscon file
  update(data) {
    let products = this.load();
    products = products.filter((product) => product.id !== data.id);
    products.push(data);
    this.save(products);
    
  },
  findProductById(id) {
    const products = this.load();
    const product = products.find((product) => product.id == id);
    return product;
  },
  //buscador de productos por nombre, tipo, bodega o precio a implementar
  findbyText(text) {
    const products = this.load();
    const product = products.filter((product) => product.name.toLowerCase().includes(text.toLowerCase()) || product.type.toLowerCase().includes(text.toLowerCase()) || product.bodega.toLowerCase().includes(text.toLowerCase()) || product.price.toString().includes(text) || product.year.toString().includes(text));
    return product;
  }
};

module.exports = datasource;