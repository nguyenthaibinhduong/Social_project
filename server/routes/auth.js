var Express = require('express');
const router = Express.Router();
const Auth = require('../controllers/auth');
router.post("/login",Auth.login);
router.post("/register",Auth.register);
router.post("/logout",Auth.logout);

module.exports=router