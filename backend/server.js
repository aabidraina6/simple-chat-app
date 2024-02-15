const express = require("express");
const app = express();
const port = 5000;
const socket = require("socket.io");
const cors = require("cors");

const users = [];
const messages = [];

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});


const io = socket(app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }));

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.emit("init", messages);
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("message", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    users.splice(users.indexOf(socket.id), 1);
  });
});
