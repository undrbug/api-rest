const services_db = require("../services/services_db.js");

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
        return next();
    }

    try {
        const userEmail = req.cookies.userEmail;
        if (userEmail) {
            const user = await services_db.getByEmail(userEmail);
            if (user) {
                delete user.password;
                req.session.userLogged = user;
                res.locals.isLogged = true;
                res.locals.userLogged = user;
            }
        }
    } catch (error) {
        console.error("Error al buscar el usuario:", error.message);
    }

    next();
}

module.exports = userLoggedMiddleware;
