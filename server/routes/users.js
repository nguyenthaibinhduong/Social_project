var Express = require('express');
const router = Express.Router();
const User = require('../controllers/users');
router.get("/find/:id",User.getUser);

module.exports=router