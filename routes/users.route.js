const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/count', usersController.count)
router.get('/', usersController.getAll);
router.get('/:id', usersController.getbyid);
router.get('/getbyemail/:email', usersController.getOneByEmail);


module.exports = router;