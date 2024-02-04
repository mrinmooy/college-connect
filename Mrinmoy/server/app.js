const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json());

// const middleware = (req,res,next)=>{
//     console.log('this is middleware')
//     next();
// }

dotenv.config({path: './config.env'})

require('./db/conn')


const PORT = process.env.PORT;



//const DB = 'mongodb+srv://mrinmooy:mrinmoy2003@cluster0.dgc2t2f.mongodb.net/?retryWrites=true&w=majority'

// linking the router files here
app.use(require('./router/auth'));


app.get('/',(req,res)=>{
    
    res.send('Hello from home page');
});

app.get('/contact',(req,res)=>{
   // res.cookie("Test",'mrinmoy');
    res.send('Hello from contact page');
});

app.get('/about', (req,res)=>{
    res.send('Hello from about page');
});

app.get('/signin',(req,res)=>{
    res.send('Hello from signin page');
});

app.get('/signup',(req,res)=>{
    res.send('Hello from signup  page');
});

app.listen(PORT,()=>{
    console.log(`app.js is listening on port no. ${PORT}`);
})