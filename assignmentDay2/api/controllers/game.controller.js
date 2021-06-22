const gamesData = require("../data/games.json");

module.exports.gamesGetAll = function(req, res){
    console.log("Json request received");
    let offset = 0;
    let count = 25;
    if (req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count){
        count = parseInt(req.query.count);
    }
    const pageGames = gamesData.slice(offset, offset + count);
    // res.status(200).json(gamesData);

    res.status(200).json(pageGames);
}

module.exports.gamesGetOne = function(req, res){
    console.log("Json request received");
    const gameId = req.params.gameId;
    const theGame = gamesData[gameId];
    res.status(200).json(theGame);
}

module.exports.gamesAddOne = function(req, res){
    console.log("Add one game");
    console.log(req.body);
    // const gameId = req.params.gameId;
    // const theGame = gamesData[gameId];
    res.status(200).json(req.res);
}
