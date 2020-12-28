const express = require("express");
const app = express();
const server = require("http").Server(app);
// creating socketIO
const io = require("socket.io")(server);
const { v4: uuid } = require("uuid");

// set up server
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuid()}`);
});

app.get("/:room", (req, res) => {
  //   console.log(req.req.params.room);
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomID, userId) => {
    socket.join(roomID);
    socket.to(roomID).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomID).broadcast.emit("user-disconnected", userId);
    });
  });
});
server.listen(3000);
