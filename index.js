// =========== root level file of server ============
require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const { dbConfig } = require('./config/db.config');
const _ = require("./route/api");
const { globalErrorHandiling } = require('./utils/globalErrorHandler');
const session = require('express-session');  // using for stateful authentication and it has to be placed in main index file of server
const {MongoStore} = require('connect-mongo');  //will store session info in db
const app = express()
dbConfig();
app.use(express.json())
app.use(express.static('uploads'))    // mention the file name,gives the permission to access static files (img,pdf) from anywhere

app.use(session({ 
   store: MongoStore.create({ mongoUrl: "mongodb+srv://E-commerce:Mi52RncGdx9zhjdC@cluster0.dqfhgpq.mongodb.net/E-commerce?appName=Cluster0" }),
  name : "PandaNest",                            // this session must be placed globally and on top of all other routes, cause before going to any route, this session will generate  
  secret: process.env.SESSION_SECRET,          // your app's secret pass
  resave: false,                  // it means if you want to generate a new session whenever changes occur
  saveUninitialized: true,            // not saving it forever
  cookie: { secure: false }       // localhost hole secure false, http server hole secure true
}))

app.use(process.env.BASE_URL, _)

app.get("/session",(req,res)=>{
  console.log(req.session.user);
  
    return res.send("Session created")
})


// error handler

app.use(globalErrorHandiling)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

