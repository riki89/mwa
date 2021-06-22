const express = require("express");

const router = express.Router();

router.get("/multiply/:number1", function (req, res){
    let number1 = req.params.number1;
    let number2 = 0;
    if (req.query && req.query.number2){
        number2 = parseFloat(req.query.number2, 10);
    }

    let result = number1 * number2;
    res.status(200).json({"result": result});
});

module.exports = router;