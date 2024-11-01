const router = require('express').Router();
const productsController = require('../controllers/products.controller.js');

//Lista los tipos de bebidas
router.get('/drinklist', productsController.drinkList);

//muestra todos los prodctos de manera dinamica
router.get('/', productsController.getAll);
//traer un producto por id
router.get('/:id', productsController.getOneById);

//muestra productos filtrados en el input_search
router.get('/search/:search', productsController.searchProducts);


module.exports = router;