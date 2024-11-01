const uploadUser = require('../services/multerUserStorage.js');
const { body } = require('express-validator');

const validationsRegister = [
    body('firstName').notEmpty().withMessage('El nombre es obligatorio'),
    body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().bail().withMessage('Ingresa un email valido').bail()
        .notEmpty().withMessage('El email es obligatorio'),
    body('phone').notEmpty().withMessage('El teléfono es obligatorio'),
    body('adress').notEmpty().withMessage('La dirección es obligatoria'),
    body('country').notEmpty().withMessage('El país es obligatorio'),
    body('state').notEmpty().withMessage('La ciudad es obligatoria'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres'),
    body('rePassword').notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres'),
    body('rePassword').custom((value, { req }) => {
        if (req.body.password !== req.body.rePassword) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body('image').custom((value, { req }) => {
        if (!req.file) {
            return true;
        }
    })
];

module.exports = validationsRegister;