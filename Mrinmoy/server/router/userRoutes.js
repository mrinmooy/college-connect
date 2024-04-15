const express = require("express");
const { allUsers } = require("../controllers/userController");

const router = express.Router();

router.route("/").get(allUsers);

module.exports = router;