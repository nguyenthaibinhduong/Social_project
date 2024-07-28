var Express = require('express');
const router = Express.Router();
const Comment = require('../controllers/comments');
router.get("/", Comment.getByPost);
router.post("/", Comment.addComment);


module.exports=router