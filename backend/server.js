const express = require("express");
const app = express();
const port = 5000;
const socket = require("socket.io");    


app.get("/", (req, res) => {  
    res.send("Hello World");
});

const server  = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const io = socket(server);  
