const gamesData = require("../data/games.json");

module.exports.gamesGetAll = function(req, res){
    console.log("Json request received");
    res.status(200).json(gamesData);
}

module.exports.gamesGetOne = function(req, res){
    console.log("Json request received");
    const gameId = req.params.gameId;
    
    res.status(200).json(gamesData);
}

