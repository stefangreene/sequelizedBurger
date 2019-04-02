var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

//........Create routes and logic.............................
router.get("/", function(req,res){
    burger.all(function(data){
        var hbsObject = {
            burgers: data
        };
        //console.log(hbsObject);
        //console.log({burgers: data});
        res.render("index", hbsObject);
    });
});

router.get("/api/hamburgers", function (req,res){
    burger.all(function(data){
        res.json(data);
    });
});

router.post("/api/hamburgers", function(req,res){
    burger.create([
        "name","eaten"
    ], [
        req.body.name, req.body.eaten
    ], function(result){
        // Send back the ID of the new burger
        res.json({id: result.insertId});
    });
});

router.put("/api/hamburgers/:id", function(req,res){
    var condition = " id = " + req.params.id;

    console.log("condition: " + condition);

burger.update({
    eaten: req.body.eaten
},  condition, function(result){
    if(result.changedRows == 0){
        //....If no rows were changed, ID must not exist, (404)......
        return res.status(404).end();
        }   else{
        res.status(200).end();
        }
    });
});

router.delete("/api/hamburgers/:id", function(req,res){
    var condition = " id = " + req.params.id;
    //console.log(req.params.id);
    //console.log(condition);
    console.log("condition: " + condition);

    burger.delete(condition, function(result){
        if(result.affectedRows == 0){
        //....If no rows were changed, ID must not exist, (404)......
        return res.status(404).end();
        }   else{
        res.status(200).end();
        }
    });
});

// Export the routes for server.js to use.
module.exports = router;