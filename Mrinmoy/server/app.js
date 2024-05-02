const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}))  ;
const userRoutes = require('./router/userRoutes');
const chatRoutes = require('./router/chatRoutes');
const messageRoutes = require('./router/messageRoutes');


const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}
app.use(cors(corsOptions));

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
    app.use("/api/user", userRoutes);
    app.use("/api/chat", chatRoutes);
    app.use("/api/message", messageRoutes);
    app.use('/fetch', require('./router/fetch'));
    app.use('/fetch-exam', require('./router/fetch-exam'));
    app.use('/fetch-datesheet', require('./router/fetch-datesheet'));
    app.use('/fetch-cgpa', require('./router/fetch-cgpa'));

app.get('/',(req,res)=>{
    
    res.send('Hello from home page');
});

app.get('/contact',(req,res)=>{
   // res.cookie("Test",'mrinmoy');
    res.send('Hello from contact page');
});

// app.get('/about', (req,res)=>{
//     res.send('Hello from about page');
// });

app.get('/signin',(req,res)=>{
    res.send('Hello from signin page');
});

app.get('/signup',(req,res)=>{
    res.send('Hello from signup  page');
});

const server = app.listen(PORT,()=>{
    console.log(`app.js is listening on port no. ${PORT}`);
})






// const io = require("socket.io")(server, {
//     pingTimeout: 60000,
//     cors: {
//       origin: "http://localhost:3000",
//       // credentials: true,
//     },
//   });
  
  // io.on("connection", (socket) => {
  //   console.log("Connected to socket.io");
  //   socket.on("setup", (userData) => {
  //   if(!userData || !userData._id){
  //       console.log("returning from setup");
  //       return;
  //   }
    //   socket.join(userData._id);
    //   socket.emit("connected");
    // console.log("in setup");
    // });
  
    // socket.on("join chat", (room) => {
    //   socket.join(room);
    //   console.log("User Joined Room: " + room);
    // });
    // socket.on("typing", (room) => socket.in(room).emit("typing"));
    // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    // socket.on("new message", (newMessageRecieved) => {
    //   var chat = newMessageRecieved.chat;
    //     console.log("happen");
    //   if (!chat.users) return console.log("chat.users not defined");
  
    //   chat.users.forEach((user) => {
    //     if (user._id == newMessageRecieved.sender._id) return;
    //     console.log("got the memo`");
    //     socket.in(user._id).emit("message recieved", newMessageRecieved);
    //   });
    // });
  
    // socket.off("setup", () => {
    //   console.log("USER DISCONNECTED");
    //   socket.leave(userData._id);
    // });
  // });