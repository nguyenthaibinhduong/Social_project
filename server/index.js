var Express = require('express');
const app = Express();
var userRoutes = require('./routes/users');
var postRoutes = require('./routes/posts');
var likeRoutes = require('./routes/likes');
var commentRoutes = require('./routes/comments');
var authRoutes = require('./routes/auth');
var relationshipsRoutes = require('./routes/relationships');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var multer  = require('multer')

// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials",true);
    next();
});
app.use(Express.json());
app.use(cors({
    origin: 'http://localhost:4000'
}))
app.use(cookieParser());

//Upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single('file'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename)
})
// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/relationships", relationshipsRoutes);
app.use("/api/auth", authRoutes);

app.listen(8008, () => {
    console.log("API working on http://localhost:8008 ");
})