var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const fileUpload = require("express-fileupload");

const Users = require("./routes/users-routes");
const Followers = require("./routes/followers-routes");
const Following = require("./routes/following-routes");
const Post = require("./routes/post-routes");
const Comments = require("./routes/comments-routes");
const Chat = require("./routes/chat-routes");
const Book = require("./routes/book-routes");
const Videos = require("./routes/videos-routes");
const Order = require("./routes/order-routes");
const payment = require("./routes/payment");

const socket = require("socket.io");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const chatController = require("./controllers/chat-controller");
const createChat = chatController.createChat;
const app = express();

const url =
  "mongodb+srv://shahzeb:shahzeb123@cluster0.eggx4.mongodb.net/shef?retryWrites=true&w=majority";
//  "mongodb+srv://bcpplatform:timbcpplatform@cluster0.rfhb0.mongodb.net/bcpplatform?retryWrites=true&w=majority"

mongoose.connect(url, (err, db) => {
  if (err) throw console.log("err>>>", err);
  console.log("DB is Connected");
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Content-Length,Host,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use("/api/users", Users);
app.use("/api/followers", Followers);
app.use("/api/following", Following);
app.use("/api/post", Post);
app.use("/api/comments", Comments);
app.use("/api/chat", Chat);
app.use("/api/books", Book);
app.use("/api/videos", Videos);
app.use("/api/order", Order);
app.use("/api/pay", payment);

app.use("*", (req, res, next) => {
  res.status(404).json({ status: 404, message: "Page Not Found", data: null });
});

var port = process.env.PORT || 4003;
var server = app.listen(port, () =>
  console.log(`Node API listening on port ${port}`)
);
const io = socket(server);
io.on("connection", (socket) => {
  console.log("Socket is online!");
  // for chatting
  socket.on("chat-message", (message) => {
    console.log("message", message);
    createChat(message).then((sentMsg) => {
      // console.log("sentMsg", sentMsg);
      // const receivers = msg.owner + "//" + msg.buyer;
      // msg.user_id = sentMsg.user_id;
      io.sockets.emit("chat-message", {
        message,
        // senderId: sentMsg.senderId,
        // recieverId: sentMsg.recieverId,
      });
    });
  });
});

server.setTimeout(500000);
