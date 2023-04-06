const e = require('express');
const responses = require('../Helpers/responses');
const asyncAction = require('../Helpers/asyncAction').asyncAction;

const con = require('../databaseConnector').dbConnector

module.exports = {
    getAllScores : (req,res)=>{
        con.query("SELECT userID,levelID,highscore from scores",(err,results,field)=>{
            if(err) throw err;
            res.json(results);
        })
    },
    getScoresForLevel : (req,res)=>{
        let levelName = req.params.levelName;
        let gameName = req.params.gameName;

        let sqlQuery = "SELECT userID,scores.levelID,highscore,gameName,levelName FROM scores JOIN levels ON scores.levelID = levels.levelID WHERE gameName = ? AND levelName = ? ORDER BY scores.highscore DESC;";
        let options = [gameName,levelName]
        if(levelName === undefined || levelName === ""){
                sqlQuery = "SELECT userID,scores.levelID,highscore,gameName,levelName FROM scores JOIN levels ON scores.levelID = levels.levelID WHERE gameName = ? ORDER BY scores.highscore DESC;"
                options = [gameName]
        }

        con.query(sqlQuery,
        options,
        (err,results,field)=>{
                if(err) throw err;

                let collections = {}

                results.forEach(element => {
                    let currentLevel = element.levelName

                    if(collections[currentLevel] === undefined){
                        collections[currentLevel]  = []
                     

                    }
                 
                    collections[currentLevel].push({
                        
                        userID : element.userID,
                        levelID : element.levelID,
                        highScore : element.highscore

                    })
                });

               return responses.success(res,collections,200);
                

        })

    },
    updateHighscore :  (req,res)=>{

         
   
        //If both valid

        // let levelID= req.params.levelID
        // let userID = req.params.userID
       
        let userID = req.body.userID
        let levelID = req.body.levelID

        let highscore = req.body.highscore

        // con.query("SELECT highscore FROM scores WHERE userID=? AND levelID=?", [userID, levelID],(err,result,field)=>{
        //     if(err) {
        //         responses.error(res,"Query Error",500);
        //     }

        //     if(results[0].highscore < highscore) {
        //             con.query("UPDATE scores SET highscore = ? WHERE userID = ? AND levelID = ?", [highscore,userID, levelID] ,(err,results,field)=>{

        //                 res.json(results)
        //         }
        //         )
            
        //     }
        // })

        con.query("UPDATE scores SET highscore = ? WHERE userID = ? AND levelID = ? AND highscore < ?;", [highscore,userID, levelID,highscore] ,(err,results,field)=>{
                            if(err) return responses.error(res,"Error in SQL update",500,{internalError:err})

                            if(results.affectedRows < 1){
                                return responses.error(res,"Highscore not updated since it's lower than the current highscore!",400)
                            }else{

                                return responses.success(res,{message:"Highscore Updated successfully!"},201)
                            }

                          
                     }
        )
        
    }

}

validateUser = (req)=>{
    if(req.body.userID === req.userID){
        Promise.resolve()
    }else{
        Promise.reject("Not same user")
    }
}

validateHighscoreToken = (req)=>{
    Promise.resolve()
}