const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/count', usersController.count)
router.get('/', usersController.getAll);
router.get('/getonebyemail/:email', usersController.getOneByEmail);
router.get('/:id', usersController.getbyid);


module.exports = router;