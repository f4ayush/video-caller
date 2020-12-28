const express = require("express");
const app = express();
const server = require("http").Server(app);
// creating sockerIO
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
server.listen(3000);
