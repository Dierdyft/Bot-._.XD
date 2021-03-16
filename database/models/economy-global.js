const mongo = require("mongoose");

const g_economy = new mongo.Schema({
  userID: String,
  pro_oro: {
    type: Number,
    default: 200
  },
  pro_elixir: {
    type: Number,
    default: 200
  },
  gemas: {
    type: Number,
    default: 30
  },
  pro_dark_elixir: {
    type: Number,
    default: 30
  },
  gen_oro: {
    type: Array,
    default: []
  },
  gen_elixir: {
    type: Array,
    default: []
  },
  gen_dark_elixir: {
    type: Array,
    default: []
  },
  alm_oro: {
    type: Array,
    default: [
      {
        id: 12365,
        limite: 1200,
        lleva: 200,
        nivel: 1
      }
    ]
  },
  alm_elixir: {
    type: Array,
    default: [
      {
        id: 12365,
        limite: 1200,
        lleva: 200,
        nivel: 1
      }
    ]
  },
  alm_dark_elixir: {
    type: Array,
    default: []
  },
  clan: String
});

module.exports = mongo.model("global-economy", g_economy);
