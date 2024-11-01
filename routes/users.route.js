const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/count', usersController.count)
router.get('/users', usersController.getAll);
router.get('/getonebyemail/:email', usersController.getOneByEmail);
router.get('/users/:id', usersController.getbyid);


module.exports = router;