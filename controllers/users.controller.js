const db = require("../database/models/index.js");
const servicesDB = require("../services/services_db.js");

const url = process.env.URL;

const usersController = {
	//Tiene que devolver un objeto literal con la cantidad de usuarios
	getAll: async (req, res) => {
		try {
			const users = await servicesDB.getAll();
			res.json({
				count: users.length,
				users: users.map((user) => {
					return {
						id: user.id,
						name: user.name + " " + user.lastname,
						email: user.email,
						avatar: `${url}/images/avatars/${user.image}`,
						detail: `${url}/api/users/${user.id}`,
					};
				}),
			});
		} catch (error) {
			console.log("Error al buscar los usuarios", error.message);
		}
	},
	getOneByEmail: async (req, res) => {
		try {
			const user = await servicesDB.getByEmail(req.params.email);
			res.json(user);
		} catch (error) {
			console.log("Error al buscar el usuario", error.message);
		}
	},
    getOneById: async (req, res) => {
        try {
            const user = await db.Customer.findByPk(req.params.id);
            res.json({
				user: {
					id: user.id,
					name: user.name + " " + user.lastname,
					email: user.email,
					phone: user.phone,
					adress: user.adress,
					country: user.country,
					state: user.state,
					//revisar la imagen
					avatar: `${url}/images/avatars/${user.image}`,
					detail: `${url}/api/users/${user.id}`
				}
			});
        } catch (error) {
            console.log("Error al buscar el usuario", error.message);
        }
    },
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
};

module.exports = usersController;
