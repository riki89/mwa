const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    pop: {
        type: Number
    },
    state: {
        type: String
    },
    loc: {
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }
})

mongoose.model("City", citySchema, "zips");