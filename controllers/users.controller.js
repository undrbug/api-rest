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
	getAll: async (req, res) => {
		try {
			// const users = await servicesDB.getAll();
			// const users = await db.Customer.findAll();
			const limit = parseInt(req.query.limit) || 10;
			const offset = parseInt(req.query.offset) || 0;

			// Consulta paginada y conteo total
			const { count, rows: users } = await db.Customer.findAndCountAll({
				limit,
				offset,
				order: [["ID_Customer", "ASC"]],
			});

			const totalPages = Math.ceil(count / limit);
			const currentPage = Math.floor(offset / limit) + 1;
			
			// Contar usuarios administradores, activos y verificados
			const countAdmins = await db.Customer.count({
				where: {
					isAdmin: true,
				},
			});

			const countActive = await db.Customer.count({
				where: {
					isActive: true,
				},
			});
			
			const countVerified = await db.Customer.count({
				where: {
					verified: true,
				},
			});

			//buscamos el ultimo id de usuario agregado
			const lastAddedID = await db.Customer.max("ID_Customer");
			//traemos los datos del usuario
			const lastuserdAdded = await db.Customer.findByPk(lastAddedID);
			//obtenemos le fecha
			const fecha = `${lastuserdAdded.Date_Record.getDate()}/${lastuserdAdded.Date_Record.getMonth()}/${lastuserdAdded.Date_Record.getFullYear()}`;
			//creamos un objeto con el email y la fecha
			const lastAdded = {
				email: lastuserdAdded.email,
				fecha,
			};

			if (users) {
				res.json({
					//Cuenta la cantidad de usauarios
					count: count,
					//Cuenta la cantidad de paginas
					totalPages,
					//Cuenta la pagina actual
					currentPage,
					//si es que hay una pagina siguiente
					hasNextPage: offset + limit < count,
					//si es que hay una pagina anterior
					hasPreviousPage: offset > 0,
					//Cuenta la cantidad de usauarios que son administradores
					admins: countAdmins,
					//Cuenta la cantidad de cuentas que estan activas
					active: countActive,
					//Cuenta la cantidad de cuentas que estan verificadas
					verified: countVerified,
					//Devuelve el id del ultimo usuario
					lastAdded,
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
					verified: user.verified,
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
