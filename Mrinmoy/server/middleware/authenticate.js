const jwt = require('jsonwebtoken')
const User = require("../model/userSchema");

const Authenticate = async (req,res,next) => {
    try {
        //console.log('not even the token');
        const token = req.cookies.jwtoken;
        console.log('here we have our token ',token);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});
        // console.log(rootUser);
        if(!rootUser){ throw new Error('User not found')}
        // console.log('did we make it?');
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        // console.log(rootUser)
        next();
    } catch (error) {
        res.status(401).send('Unauthorized: no token provided')
        // console.log('we did not');
        console.log('no user is logged in')
        //console.log(error);
    }
}

module.exports = Authenticate;