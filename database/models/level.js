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
  message: {
    type: String,
    default: "[user] Haz subido a nivel [level], épico!"
  },
  channel: {
    type: String
  },
  ignore_channel: {
    type: Array,
    default: []
  },
  ignore_roles: {
    type: Array,
    default: []
  }, 
  boost: {
    type: Number, 
    default: 9
  },
  exp_max: {
    type: Number,
    default: 30
  },
  exp_min: {
    type: Number,
    default: 15
  },
  role_message: {
    type: String,
    default: "[user] haz subido al nivel [level] y consigues el role [role]"
  }
});

module.exports = mongo.model("leveling", economy);
