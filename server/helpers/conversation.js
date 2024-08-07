const { ConversationModel } = require("../models/ConversationModel");

const getConversation = async (currentUserId) => {
  if (currentUserId) {
    const currentUserConversation = await ConversationModel.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
      .sort({ updatedAt: -1 })
      .populate("messages")
      .populate("sender")
      .populate("receiver");

    const conversation = currentUserConversation.map((conv) => {
      const countUnseenMsg = conv.messages.reduce((prev, curr) => {
        const meessagebyUserId = current?.messageByUserId?.toString();

        if (meessagebyUserId !== currentUserId) {
          return prev + (curr?.seen ? 0 : 1);
        } else {
          return prev;
        }
      }, 0);

      return {
        _id: conv?._id,
        sender: conv?.sender,
        receiver: conv?.receiver,
        unseenMessage: countUnseenMsg,
        lastMessage: conv.messages[conv?.messages?.length - 1],
      };
    });
    return conversation;
    // socket.emit("conversation", conversation);
  } else {
    return [];
  }
};

module.exports = getConversation;
