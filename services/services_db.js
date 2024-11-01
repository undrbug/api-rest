const db = require('../database/models');

const servicesDB = {
    getByEmail: async (email) => {
        try {
            const user = await db.Customer.findOne({ where: { email: email } });
            return user;
            
        } catch (error) {
            console.log("Error al buscar el usuario", error.message);
        }
    },
    getAll: async () => {
        try {
            const users = await db.Customer.findAll();
            return users
            
        } catch (error) {
            console.log("Error al buscar el usuario", error.message);
        }
    }
}

module.exports = servicesDB;