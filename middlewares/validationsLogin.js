const { body } = require('express-validator');

const validationsLogin = [
    body('email').isEmail().bail().withMessage('Ingrese un email valido').bail()
        .notEmpty().withMessage('El email es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres')
];

module.exports = validationsLogin;