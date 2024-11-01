const router = require("express").Router();
let db = require("../database/models");
const servicesDB = require('../services/services_db');

const productsController = {
	getAll: async (req, res) => {
		try {
			const products = await db.Product.findAll();
			res.json(products);
		}catch (error) {
			console.log("Error al buscar el usuario", error.message);
		}
	},
	getOneById: async (req, res) => {
		try {
			const product = await db.Product.findByPk(req.params.id);
			res.json(product);
		}catch (error) {
			console.log("Error al buscar el usuario", error.message);
		}
	},
	getOneByEmail: (req, res) => {
		const { email } = req.params;
		servicesDB.getByEmail(email)
			.then((wine) => {
				console.log(wine); // Puedes verificar los datos en la consola
				res.render("products/productDetail.ejs", {
					title: "Product Detail",
					wine: wine,
				});
			})
			.catch((error) => {
				console.error("Error al obtener productos:", error.message);
				res.status(500).send("Error al obtener la lista de productos.");
			});
	},

	//obtner los valores en formato json de la tabla DrinkType (sin vista)
  	//para completar el select de la vista de alta de productos
	drinkList: (req, res) => {
		db.Drinktype.findAll()
			.then((drinkList) => {
				res.send(drinkList);
			})
			.catch((error) => {
				// Manejo de errores
				console.error("Error al obtener productos:", error);
				res.status(500).send("Error al obtener la lista de productos.");
			});
	},
	//busca productos desde el input de busqueda del navbar
	searchProducts: (req, res) => {
		const { search } = req.params;
		db.Product.findAll({
			where: {
        //buscar por todos los campos de la tabla productos
        [db.Sequelize.Op.or]: [
          { name: { [db.Sequelize.Op.like]: `%${search}%` } },
          { drink_description: { [db.Sequelize.Op.like]: `%${search}%` } },
          { drink_type: { [db.Sequelize.Op.like]: `%${search}%` } },
          { Presentation: { [db.Sequelize.Op.like]: `%${search}%` } },
          { price: { [db.Sequelize.Op.like]: `%${search}%` } },
          { brand: { [db.Sequelize.Op.like]: `%${search}%` } },
        ],
			},
		})
			.then((wineList) => {
				res.render("products/products.ejs", {
					title: "Product List",
					wineList: wineList,
				});
			})
			.catch(function (error) {
				console.error("Error al obtener productos:", error.message);
				res.status(500).send("Error al obtener la lista de productos.");
			});
	},
};

module.exports = productsController;