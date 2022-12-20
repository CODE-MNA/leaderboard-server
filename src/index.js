const express = require('express');
const app = express();
const scoreController = require('./Controllers/ScoreController');
require('dotenv').config();


const PORT = process.env.PORT || 8000;


  app.get("/", function(req, res){
    res.status(200).send("Works")
  })

  app.get("/scores",scoreController.getAllScores)
  app.get("/scores/:gameName/:levelName",scoreController.getScoresForLevel)



  
app.listen(PORT,()=>{
    console.log("Server started at : http://localhost:" + PORT )
})