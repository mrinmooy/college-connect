const express = require("express");
const { Authenticate } = require("../middleware/authenticate");
const { sendMessage, allMessages } = require("../controllers/messageController");

const router = express.Router()

router.route('/').post(Authenticate, sendMessage);
router.route('/:chatId').get(Authenticate, allMessages);


module.exports = router;