//Import express and burger.js 
var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

// Create all routes and set up logic 
router.get("/", function (req, res) {
  burger.all(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  console.log(req.body);
  // This is to delete a burger
  if (req.body._method === "DELETE") {
    burger.delete([
      "name"
    ], [
      req.body.name
    ], function (result) {
      // Send back the ID of the new quote
      res.redirect('/');
    });
  } else {
    burger.create([
      "name"
    ], [
      req.body.name
    ], function (result) {
      // Send back the ID of the new quote
      res.redirect('/');
    });
  }
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    name: req.body.name
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes
module.exports = router;