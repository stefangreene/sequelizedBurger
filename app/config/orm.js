//..........import mysql connection............................................
var connection = require("../config/connection.js");

//..function to create an array of question marks for database query...........
function QuestionMarks(num){
    var arr = [];
    
    for (var i = 0; i < num; i++){
        arr.push("?");
    }
    return arr.toString();
}

//..function to convert object key/values to SQL syntax........................
function objectToSequal(ob){
    var arr = [];

    //..loop the keys and push the key/values as a string int arr..............
    for(var key in ob){
        var value = ob[key];
        //...skip hidden properties..........
        if(Object.hasOwnProperty.call(ob, key)){
        //if the string has spaces, add quotations () => 'Lana Del Grey').......
        if(typeof value === "string" && value.indexOf(" ") >=0 ){
            value = "'" + key + "'";
        }
        // e.g. {burger: 'Bacon Ceesburger'} => ["burger='Bacon Cheeseburger'"].
        // e.g. {eaten: false} => ["eaten=false"]
        arr.push(key + "=" + value);
        }
    }
    // translate an array of strings to a single comma-separated string.........
    return arr.toString();
}

//......Object for every SQL statement function.................................
var orm = {
    all: function (tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result){
        if (err){
            throw err;
        }
        cb(result);
      });
    },
    create: function (table, cols, vals, cb){
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES ( ";
        queryString += QuestionMarks(vals.length);
        queryString += ")";

        console.log(queryString);
      connection.query(queryString, function(err, result){
        if (err){throw err;}cb(result);
        });
    },
    update: function(table, objColVals, condition, cb){
        var queryString = " UPDATE " + table;

        queryString += " SET " + objectToSequal(objColVals) + " WHERE " + condition;
        console.log(queryString);
      connection.query(queryString, function(err, result){
          if (err){throw err;}cb(result);
      });
    },
    delete: function(table, condition,cb){
        var queryString = " DELETE FROM " + table;
        queryString += " WHERE " + condition;
      connection.query(queryString, function(err,result){
            if (err){throw err;}cb(result);
        });
    }
};
// Export the orm object for the model (burger.js).
module.exports = orm;