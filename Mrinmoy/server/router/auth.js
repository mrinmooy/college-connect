const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {Authenticate} = require('../middleware/authenticate')


require('../db/conn');
const User = require('../model/userSchema');
const { allUsers } = require('../controllers/userController');


router.get('/',(req,res)=>{
    res.send('Hello from home page router')
});


// By using just promises:-

// router.post('/register',(req,res)=>{

//     const {name, email, phone, work, password, cpassword} = req.body;
//     if( !name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: 'please fill all fields'});
//     }
   
//     User.findOne({ email: email})
//         .then((userExists)=>{
//             if(userExists){
//                 return res.status(422).json({error: "Email already exists"});
//             }
//             const user = new User({name, email, phone, work, password, cpassword});
//             user.save().then(()=>{
//                 res.status(201).json({message: 'user registered successfully'});
//             }).catch((err)=>{
//                 res.status(500).json({error: 'Failed to register user'});
//             });
//         }).catch((err)=>{
//             res.status(500).json('something bad happened');
//             console.log(err);
//         });

// });


//By using async-await:=

router.post('/register',async (req,res)=>{

    const {name, email, phone, password, cpassword} = req.body;
    if( !name || !email || !phone ||  !password || !cpassword){
        return res.status(422).json({error: 'please fill all fields'});
    }

    try {

        const userExists = await User.findOne({ email: email})
        if(userExists){
            return res.status(422).json({error: "Email already exists"});
        }else if(password != cpassword){
            return res.status(422).json({error: "confirm password doesn't match password"});
        }
        else{
            const user = new User({name, email, phone,  password, cpassword});
            await user.save();
            res.status(201).json({message: 'user registered successfully'});
        }

    } catch (error) {

        console.log(err);
        res.status(500).json({error: 'something went wrong'});  

    }

});

router.post('/signin', async(req,res)=>{
    try {
        let token;
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: 'please fill all data'});
        }
        const userLogin = await User.findOne({email:email});
        //console.log(userLogin);
        if(userLogin){
           const isMatch = await bcrypt.compare(password,userLogin.password);
           
             token = await userLogin.generateAuthToken();
            console.log(token);

             res.cookie('jwtoken',token);
             //res.cookie('fromme','hi');
             //console.log('hii..');

           if(!isMatch){
            res.status(400).json({message: 'Invalid Credentials'});
           }
           else{
            res.json({
                _id: userLogin._id,
                name: userLogin.name,
                email: userLogin.email,
                phone: userLogin.phone,
                token: token,
            });
           }
        }else{
            res.status(400).json({message: 'Invalid Credentials'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'something went wrong'});
    }
})


router.get('/about', Authenticate, (req,res)=>{
    // console.log(authenticate);
    // console.log('This is the about me page');
    res.status(200).send(req.rootUser);
});

router.get('/logout',(req,res)=>{
    console.log("you are in logout page now")
    res.clearCookie("jwtoken",{path:'/'});
    res.status(200).send("cleared stuff");
})

module.exports = router;