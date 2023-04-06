const responses = require('../Helpers/responses');

const con = require('../databaseConnector').dbConnector

module.exports = {


    getUserScores : (req,res)=>{
        let currentUserID = req.params.userID


        //Can further join with level to get level name
        con.query("SELECT users.userID,levelID,highscore,users.userName from scores RIGHT JOIN users ON scores.userID = users.userID WHERE users.userID = ?",[currentUserID],(err,results,field)=>{
            if(err || results.length === 0) return responses.error(res,"User not found",404,{internalError:err});

            if(results.length === 1){
                if(results[0].highscore === null){

                    return responses.success(res,{message:"No Scores by this player!"},200)
                }
            }

            let scores = []
           results.forEach((element)=>{
                scores.push({
                    levelID : element.levelID,
                    highscore : element.highscore,
                })
           })

            return responses.success(res,{
                scores:scores,
                player: results[0].userName,
                playerID : results[0].userID
            },200);
        })
    },
}