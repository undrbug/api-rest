const db = require("../database/models/index.js");
const servicesDB = require("../services/services_db.js");

const usersController = {
	getAll: async (req, res) => {
		try {
			const users = await servicesDB.getAll();
			res.json(users);
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
            res.json(user);
        } catch (error) {
            console.log("Error al buscar el usuario", error.message);
        }
    }
};

module.exports = usersController;
