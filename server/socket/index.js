const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");
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
  onlineUsers.add(user._id.toString());

  io.emit("onlineUsers", Array.from(onlineUsers));

  socket.on("message-page", async (userId) => {
    const userDetails = await UserModel.findById(userId).select("-password");

    const payload = {
      name: userDetails?.name,
      _id: userDetails?._id,
      email: userDetails?.email,
      online: onlineUsers.has(userId),
      profile_pic: userDetails?.profile_pic,
    };

    socket.emit("message-users", payload);
  });

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
