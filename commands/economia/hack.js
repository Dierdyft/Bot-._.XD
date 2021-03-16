const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const db = require("quick.db");
const hd = require("humanize-duration");

module.exports = {
  name: "hack",
  description: "Comando en que debes saber los patrones para ganar dinero",
  cooldown: 5,
  aliases: ["cheat"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await economy.findOne({
      GuildID: message.guild.id
    });
    if (!data) data = await economy.create({ GuildID: message.guild.id });

    let symbol = data.currency;
    let money_max = data.maxMoneyHack;
    let money_min = data.minMoneyHack;
    let tiempo = data.TimeHack;
    let probabilidad = data.hack_probabilidad;

    let ganancias = Math.floor(
      Math.random() * (money_max - money_min + 1) + money_max
    );
    let aleatorio = Math.round(Math.random() * 100);

    if (aleatorio <= probabilidad) {
      message.channel.send("No toco") 
    } else {
      let flechas = ["⬆️", "⬇️", "⬅️", "➡️"];
      let flecha = flechas[Math.floor(Math.random() * flechas.length)];

      const filter = response => {
        return flecha.answers.some(
          answer => answer.toLowerCase() === response.content.toLowerCase()
        );
      };
      message.channel.send(flecha.question).then(() => {
        message.channel
          .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
          .then(collected => {
            message.channel.send(
              `${collected.first().author} ha respondido correctamente`
            );
          })
          .catch(collected => {
            message.channel.send(`nadie respondio`);
          });
      });
    }
  }
};
