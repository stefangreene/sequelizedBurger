var orm = require("../config/orm.js");

var burger = {
    all: function(cb){
        orm.all("burgers", function(res){
            cb(res);
        });
    },
    create: function(col, vals, cb){
        orm.create("burgers", cols, vals, function(res){
            cb(res);
        });
    },
    update: function(objColVals, condition, cb){
        orm.update("burgers", objColVals, condition, function(res){
            cb(res);
        });
    },
    delete: function(condiiton, cb){
        orm.delete("burgers", condition, function(res){
            cb(res);
        });
    }
};

//Export the database functions for the controller (burgerControll.js).
module.exports = burger;