const asyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");
const User = require("../model/userSchema");


const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    // const {ax1} = req.body;
    // const userId = req.body;
    console.log((userId));
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
    // res.send("hi");
  
    var isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: req.rootUser._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password -cpassword -tokens")
      .populate("latestMessage");
  
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        users: [req.rootUser._id, userId],
      };
  
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password -tokens -cpassword"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        console.log("error error");
        throw new Error(error.message);
      }
      // res.send("hi")
    }
  });

  const fetchChats = asyncHandler(async (req, res) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.rootUser._id } } })
        .populate("users", "-password -tokens -cpassword")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });


  module.exports = {
    accessChat,
    fetchChats
  };