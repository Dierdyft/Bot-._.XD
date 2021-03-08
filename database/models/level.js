const mongo = require("mongoose");

const economy = new mongo.Schema({
  Guild: String,
  toggle: {
    type: Boolean,
    default: false
  },
  roles: {
    type: Array,
    default: []
  },
  boost: {
    type: Number,
    default: 9
  },
  message: {
    type: String,
    default: "[user] Haz subido a nivel [level], épico!"
  }
});

module.exports = mongo.model("leveling", economy);
