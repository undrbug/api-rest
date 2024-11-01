const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/count', usersController.count)
router.get('/getall', usersController.getAll);
router.get('/getone/:email', usersController.getOneByEmail);
router.get('/getone/:id', usersController.getOneById);


module.exports = router;