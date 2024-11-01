const db = require("../database/models/index.js");
const servicesDB = require("../services/services_db.js");
require("dotenv").config();

const url = process.env.URL;

const usersController = {
	count: async (req, res) => {
		try {
			const users = await servicesDB.getAll();
			res.json({
				count: users.length,
			});
		} catch (error) {
			console.log("Error al buscar los usuarios", error.message);
		}
	},
	//Tiene que devolver un objeto literal con la cantidad de usuarios
	getAll: async (req, res) => {
		try {
			const users = await servicesDB.getAll();
			if (users) {
				res.json({
					//Cuenta la cantidad de usauarios
					count: users.length,
					//Cuenta la cantidad de usauarios que son administradores
					admins: users.filter((user) => user.isAdmin).length,
					//Cuenta la cantidad de cuentas que estan activas
					active: users.filter((user) => user.isActive).length,
					//Cuenta la cantidad de cuentas que estan verificadas
					verified: users.filter((user) => user.verified).length,
					users: [
						...users.map((user) => {
							return {
								id: user.ID_Customer,
								name: user.first_name + " " + user.last_name,
								email: user.email,
								detail: `${url}/api/users/${user.ID_Customer}`,
							};
						}),
					],
				});
			} else {
				res.json({
					count: 0,
					users: [],
				});
			}
		} catch (error) {
			console.log("Error al buscar los usuarios", error.message);
		}
	},
	getOneByEmail: async (req, res) => {
		try {
			const user = await servicesDB.getByEmail(req.params.email);
			if (user) {
				res.json(user);
			} else {
				res.json({
					message: "No se encontró el usuario",
				});
			}
		} catch (error) {
			console.log("Error al buscar el usuario", error.message);
		}
	},
	getbyid: async (req, res) => {
		try {
			const user = await db.Customer.findByPk(req.params.id);
			if (user) {
				//quitar la contraseña
				delete user.dataValues.HashPassword;
				delete user.dataValues.isAdmin;
				res.json({
					id: user.ID_Customer,
					name: user.first_name + " " + user.last_name,
					email: user.email,
					detail: `${url}/api/users/${user.ID_Customer}`,
					image: `${user.image}`,
					phone: user.phone,
					adress: user.adress,
					state: user.state,
					country: user.country,
					Date_Record: user.Date_Record,
					isActive: user.isActive,
					verified: user.verified
				});
			} else {
				res.json({
					message: "No se encontró el usuario",
				});
			}
		} catch (error) {
			console.log("Error al buscar el usuario", error.message);
		}
	},
};

module.exports = usersController;
