const express = require("express")
const { Authenticate } =  require("../middleware/authenticate");
const {accessChat, fetchChats } = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(Authenticate, accessChat);
router.route("/").get(Authenticate, fetchChats);

module.exports = router;