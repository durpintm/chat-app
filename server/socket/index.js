const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");
const {
  ConversationModel,
  MessageModel,
} = require("../models/ConversationModel");
const getConversation = require("../helpers/conversation");
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
  socket.join(user._id.toString());
  onlineUsers.add(user?._id?.toString());

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

    // get previous message
    const getConversationMessage = await ConversationModel.findOne({
      $or: [
        {
          sender: user?._id,
          receiver: userId,
        },
        {
          sender: userId,
          receiver: user?._id,
        },
      ],
    })
      .populate("messages")
      .sort({ updateAt: -1 });

    socket.emit("message", getConversationMessage?.messages || []);
  });

  // new message
  socket.on("new message", async (data) => {
    // check conversation is available in the db for both users

    let conversation = await ConversationModel.findOne({
      $or: [
        {
          sender: data?.sender,
          receiver: data?.receiver,
        },
        {
          receiver: data?.sender,
          sender: data?.receiver,
        },
      ],
    });

    // if conversation is not available
    if (!conversation) {
      const craeteConversation = await ConversationModel({
        sender: data?.sender,
        receiver: data?.receiver,
      });

      conversation = await craeteConversation.save();
    }

    const message = new MessageModel({
      text: data.text,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      messageByUserId: data?.messageByUserId,
    });

    const saveMessage = await message.save();

    const updataConversation = await ConversationModel.updateOne(
      { _id: conversation?._id },
      {
        $push: {
          messages: saveMessage?._id,
        },
      }
    );

    const getConversationMessage = await ConversationModel.findOne({
      $or: [
        {
          sender: data?.sender,
          receiver: data?.receiver,
        },
        {
          sender: data?.receiver,
          receiver: data?.sender,
        },
      ],
    })
      .populate("messages")
      .sort({ updateAt: -1 });

    io.to(data?.sender).emit("message", getConversationMessage?.messages || []);
    io.to(data?.receiver).emit(
      "message",
      getConversationMessage?.messages || []
    );

    // side bar conversation

    const conversationSenderSidebar = await getConversation(data?.sender);
    const conversationReceiverSidebar = await getConversation(data?.receiver);

    io.to(data?.sender).emit("conversation", conversationSenderSidebar || []);
    io.to(data?.receiver).emit(
      "conversation",
      conversationReceiverSidebar || []
    );
  });

  // sidebar
  socket.on("sidebar", async (currentUserId) => {
    const conversation = await getConversation(currentUserId);

    socket.emit("conversation", conversation);
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
