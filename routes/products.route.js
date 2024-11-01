const router = require('express').Router();
const productsController = require('../controllers/products.controller.js');


//muestra todos los prodctos de manera dinamica
router.get('/getall', productsController.getAll);

//muestra productos filtrados en el input_search
router.get('/search/:search', productsController.searchProducts);

//detalle de producto
router.get('/getonebyid/:id', productsController.getOneById);
router.get('/getonebyemail/:id', productsController.getOneByEmail);


router.get('/drinklist', productsController.drinkList);

module.exports = router;