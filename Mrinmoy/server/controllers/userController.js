const asyncHandler = require("express-async-handler");
const User = require("../model/userSchema")
const jwt = require('jsonwebtoken')


const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            // { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    
    // // res.send(users);
    // // console.log("search result", users);
    // // console.log("smth smth");
    const token = req.cookies.jwtoken;
    // // console.log('here we have our token ',token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const currUser = await User.findOne({_id:verifyToken._id, "tokens.token":token},"-tokens -cpasswords -password");

    const users = await User.find({
        ...keyword,
        _id: { $ne: currUser._id }
    }, "-tokens -cpassword -password");
    // console.log(rootUser);
    res.send(users);
  });

  module.exports = { allUsers };