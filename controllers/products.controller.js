const router = require("express").Router();
const { where } = require("sequelize");
let db = require("../database/models");
const servicesDB = require("../services/services_db");
require("dotenv").config();

const url = process.env.URL;

const productsController = {
	getAll: async (req, res) => {
		try {
			const limit = parseInt(req.query.limit) || 10; // Número de productos por página, por defecto 10
			const offset = parseInt(req.query.offset) || 0; // Índice inicial, por defecto 0

			const products = await db.Product.findAll({
				limit,
				offset,
			});

			const lastProduct = await db.Product.findOne({
				where: { ID_Product: products[products.length - 1].ID_Product },
			});

			if (products) {
				const totalProducts = await db.Product.count();
				res.json({
					count: products.length,
					totalProducts,
					lastProductAdded: {
						name: lastProduct.name,
						description: lastProduct.drink_description.trim(),
					},
					countByCategory: servicesDB.countByCategory(products),
					stockByCategory: servicesDB.stockByCategory(products),
					currentPage: Math.ceil(offset / limit) + 1,
					totalPages: Math.ceil(totalProducts / limit),
					products: [
						...products.map((product) => {
							return {
								id: product.ID_Product,
								name: product.name,
								drink_description: product.drink_description,
								drink_type: product.drink_type,
								Presentation: product.Presentation,
								price: product.price,
								brand: product.brand,
								detail: `${url}/api/products/${product.ID_Product}`,
							};
						}),
					],
				});
			} else {
				res.json({
					message: "No se encontraron productos",
				});
			}
		} catch (error) {
			console.log("Error al buscar el usuario", error.message);
		}
	},
	getOneById: async (req, res) => {
		try {
			const product = await db.Product.findByPk(req.params.id);
			res.json(product);
		} catch (error) {
			console.log("Error al buscar el usuario", error.message);
		}
	},
	//busca productos desde el input de busqueda del navbar
	searchProducts: (req, res) => {
		const { search } = req.params;
		db.Product.findAll({
			where: {
				//buscar por todos los campos de la tabla productos
				[db.Sequelize.Op.or]: [
					{ name: { [db.Sequelize.Op.like]: `%${search}%` } },
					{
						drink_description: {
							[db.Sequelize.Op.like]: `%${search}%`,
						},
					},
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
	drinkList: async (req, res) => {
		try {
			const drinkType = await db.Drinktype.findAll();
			if (drinkType) {
				res.json({
					count: drinkType.length,
					drinkType: [
						...drinkType.map((drink) => {
							return {
								id: drink.ID_Drinktype,
								name: drink.Name,
							};
						}),
					],
				});
			}
		} catch (error) {
			console.log("Error al buscar el usuario", error.message);
		}
	},
};

module.exports = productsController;
