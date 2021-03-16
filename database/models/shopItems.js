const mongo = require("mongoose");

const economy = new mongo.Schema({
  Guild: String, 
  Items: Array
}) 

module.exports = mongo.model("shopItems", economy) 