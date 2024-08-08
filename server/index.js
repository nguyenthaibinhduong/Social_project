var Express = require('express');
const app = Express();
require('dotenv').config();
var cors = require('cors');
var cookieParser = require('cookie-parser');
var multer = require('multer')
const http = require('http');
const { Server } = require('socket.io');

// Routes
var userRoutes = require('./routes/users');
var postRoutes = require('./routes/posts');
var likeRoutes = require('./routes/likes');
var commentRoutes = require('./routes/comments');
var messageRoutes = require('./routes/messages');
var authRoutes = require('./routes/auth');
var searchRoutes = require('./routes/search');
var relationshipsRoutes = require('./routes/relationships');


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

//SETUP SOCKET.IO API
const server = http.createServer(app); // Tạo server HTTP từ express
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4000',
        methods: ['GET', 'POST'],
    },
});
//SOCKET METHOD TO SET ONLINE ACCESS
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
//SOCKET.IO API
io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
        io.emit("getUsers", users);
    });
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log('joined:', roomId);
    });

    socket.on('sendMessage', (messageData) => {
        // Phát tin nhắn đến phòng cụ thể
        io.to(messageData.room_id).emit('receiveMessage', messageData);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

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
app.use("/api/search", searchRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/relationships", relationshipsRoutes);
app.use("/api/auth", authRoutes);


server.listen(process.env.PORT, () => {
    console.log("API working on http://localhost:"+process.env.PORT);
})