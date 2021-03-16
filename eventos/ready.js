const Discord = require("discord.js");
const mongoose = require("mongoose");
const myInv = require("../database/models/economy-global.js");

module.exports = async client => {
  console.log("Conectado como " + client.user.tag);

  client.user.setPresence({
    status: "idle",
    activity: {
      name: "Ponle que diga: OSSSA hasta la muerte",
      url: "https://www.twitch.tv/dierdyft",
      type: "STREAMING",
      emoji: "<:risas:818331582321524756>"
    }
  });

  await mongoose.connect(
    "mongodb+srv://Dierdyft:termos2005@primercluster.kfwzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Conectado a mongodb desde glitch");
    }
  );
};
