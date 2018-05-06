// Import mysql connection
// cb = callback
var connection = require("../config/connection.js");

var orm = {
    // Retrieve and store data in the database
    // select all
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, tableInput, function (err, result) {
            if (err) throw err;
            console.log(result);

            cb(result);
        })
    },
    // insert one
    createOne: function(table, cols, val, cb) {
        var queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += `"${val}"`;
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
    },
    // update one
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += "devoured = 1";
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    deleteOne: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE name = ";
        queryString += `"${condition}"`;
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
    };

module.exports = orm;