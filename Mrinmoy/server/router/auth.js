const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')


require('../db/conn');
const User = require('../model/userSchema');


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

    const {name, email, phone, work, password, cpassword} = req.body;
    if( !name || !email || !phone || !work || !password || !cpassword){
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
            const user = new User({name, email, phone, work, password, cpassword});
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
            res.json({message: "user sign in successful"});
           }
        }else{
            res.status(400).json({message: 'Invalid Credentials'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'something went wrong'});
    }
})


router.get('/about', authenticate, (req,res)=>{
    console.log('Hello my about');
    res.send(req.rootUser);
});


module.exports = router;