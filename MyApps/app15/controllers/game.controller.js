const gamesData = require("../data/games.json");

module.exports.gamesGetAll = function(req, res){
    console.log("Json request received");
    res.status(200).json(gamesData);
}