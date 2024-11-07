const router = require('express').Router();
const indexController = require('../controllers/index.controller.js');

router.get('/', indexController.index);

module.exports = router;