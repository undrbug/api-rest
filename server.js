const express = require("express");
const usersRoute = require('./routes/users.route.js');
const productsRoute = require('./routes/products.route.js');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Puerto de la aplicación
const PORT = process.env.PORT || 3306;

// Middleware para analizar el cuerpo de la solicitud
//Sin esto, en el req.body no se puede acceder a los datos enviados por el formulario
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.use('/users', usersRoute);
app.use('/products', productsRoute);

// app.use((req, res, next) => {
//     res.status(404).render('errors/404.ejs', {
//         title: '404 - Page not Found'
//     });
// });

// Inicio del servidor
app.listen(PORT, () => console.log(`API Server running on http://localhost:${PORT}`));