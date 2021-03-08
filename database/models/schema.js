const mongo = require("mongoose");

module.exports = mongo.model(
  "Money",
  new mongo.Schema({
    Guild: String,
    id: String,
    coins: Number,
    bank: { type: Number, default: 0 }
  })
);
