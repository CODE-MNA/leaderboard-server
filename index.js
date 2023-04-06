const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const scoreController = require('./src/Controllers/ScoreController');
const authController = require('./src/Controllers/AuthController');
const {authenticateToken} = require('./src/Authorization/authenticateToken');
const UserController = require('./src/Controllers/UserController');
require('dotenv').config();



const PORT = process.env.PORT || 8000;

//Static Middlewares
app.use(cors({
  origin: '*'
}))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Routes
  app.get("/", function(req, res){
    res.status(200).send("Works")
  })


  app.post("/auth/login", authController.login) 
  app.post("/auth/register", authController.register) 


  app.get("/users/:userID/scores",UserController.getUserScores)


  app.get("/scores",authenticateToken,scoreController.getAllScores)


  app.get("/scores/:gameName/:levelName?",scoreController.getScoresForLevel)


  app.put("/scores",authenticateToken,scoreController.updateHighscore)

   
  
app.listen(PORT,()=>{
    console.log("Server started at : http://localhost:" + PORT )
})