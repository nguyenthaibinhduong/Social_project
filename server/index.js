var Express = require('express');
const app = Express();
var userRoutes = require('./routes/users');
var postRoutes = require('./routes/posts');
var likeRoutes = require('./routes/likes');
var commentRoutes = require('./routes/comments');
var authRoutes = require('./routes/auth');

app.use(Express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.listen(8008, () => {
    console.log("API working on http://localhost:8008 ");
})