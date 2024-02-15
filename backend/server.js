const express = require("express");
const app = express();
const port = 5000;
const socket = require("socket.io");

const users = [];
const messages = [];

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const io = socket(server);

io.on("connection", (socket, name) => {
  console.log("New client connected");
  users.push({
    id: socket.id,
    name: name,
  });
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
