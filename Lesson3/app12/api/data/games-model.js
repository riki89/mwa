const mongoose = require("mongoose");
const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    }
})
const gamesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    }, //String,
    price: Number,
    year: Number, 
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: Number,
    minAge: {
        type: Number,
        min: 4
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    }, 
    designers: [String],
    //type: ObjectId, Date, Buffer (for image)
    publisher: publisherSchema
});

// mongoose.model("Game", gamesSchema, "collection_name")

mongoose.model("Game", gamesSchema, "games");