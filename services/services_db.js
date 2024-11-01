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
    },
    countByCategory: (products) => {
        const countByCategory = products.reduce((acc, product) => {
            acc[product.drink_type] = acc[product.drink_type] + 1 || 1;
            return acc;
        }, {});
        return countByCategory;
    },
    stockByCategory: (products) => {
        const stockByCategory = products.reduce((acc, product) => {
            acc[product.drink_type] = acc[product.drink_type] + product.Stock || product.Stock;
            return acc;
        }, {});
        return stockByCategory;
    }
}

module.exports = servicesDB;