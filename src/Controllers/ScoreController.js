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
        con.query("SELECT userID,scores.levelID,highscore from scores JOIN levels ON scores.levelID = levels.levelID WHERE gameName = ? AND levelName = ? ;",
        [gameName, levelName],
        (err,results,field)=>{
                if(err) throw err;
                res.json(results)
                

        })

    },
    updateHighscore : async (req,res)=>{

        await validateUser(req)
        await validateHighscoreToken(req)
        //If both valid

        // let levelID= req.params.levelID
        // let userID = req.params.userID
        let userID = 1
        let levelID = 1

        con.query("UPDATE scores SET highscore = ? WHERE userID = ? AND levelID = ?", [userID, levelID] ,(err,results,field)=>{

                res.json(results)
        }
        )
        
        
    }

}

validateUser = (req)=>{
    Promise.resolve()
}

validateHighscoreToken = (req)=>{
    Promise.resolve()
}