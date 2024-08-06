const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const app = express();

// socket connection
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

// online users
const onlineUsers = new Set();

io.on("connection", async (socket) => {
  console.log("Connect User ", socket.id);

  const token = socket.handshake.auth.token;

  const user = await getUserDetailsFromToken(token);

  // create a room
  socket.join(user._id);
  onlineUsers.add(user._id);

  io.emit("onlineUsers", Array.from(onlineUsers));

  // disconnect
  socket.on("disconnect", () => {
    onlineUsers.delete(user?._id);
    console.log("Disconnect user ", socket.id);
  });
});

module.exports = {
  server,
  app,
};
