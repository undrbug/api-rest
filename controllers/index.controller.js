const express = require('express');

const indexController = {
    index: (req, res) => {
        const documentation = {
            "users": [
              { "method": "GET", "route": "/api/users/count", "description": "Obtiene el conteo total de usuarios." },
              { "method": "GET", "route": "/api/users", "description": "Obtiene todos los usuarios." },
              { "method": "GET", "route": "/api/users/:id", "description": "Obtiene un usuario por ID." },
              { "method": "GET", "route": "/api/users/getbyemail/:email", "description": "Obtiene un usuario por email." }
            ],
            "products": [
              { "method": "GET", "route": "/api/products/drinklist", "description": "Lista los tipos de bebidas." },
              { "method": "GET", "route": "/api/products", "description": "Obtiene todos los productos." },
              { "method": "GET", "route": "/api/products/:id", "description": "Obtiene un producto por ID." },
              { "method": "GET", "route": "/api/products/search/:search", "description": "Busca productos según término." }
            ]
          };
        
          res.json(documentation);
    }
}

module.exports = indexController;