const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const db = require("quick.db");
const hd = require("humanize-duration");

module.exports = {
  name: "depositar",
  description: "Deposita tu dinero en el banco",
  cooldown: 5,
  aliases: ["deposit", "dep"],
  args: true,
  usage: "<dinero>",
  execute: async (client, message, args, prefix) => {
    let data = await economy.findOne({
      GuildID: message.guild.id
    });
    if (!data) data = await economy.create({ GuildID: message.guild.id });

    let sim = data.currency;

    let mi_bal = await client.bal(message.guild.id, message.author.id);

    const dinero = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Proporciona la cantidad de dinero que vas a depositar"
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0]) return message.channel.send(dinero);

    const numero = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> La cantidad que proporcionaste no es un numero"
      )
      .setColor("RED")
      .setTimestamp();
    if (isNaN(args[0])) return message.channel.send(numero);

    const insuficiente = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> No puedes depositar más de lo que posees"
      )
      .setColor("RED")
      .setTimestamp();
    if (parseInt(args[0]) > mi_bal) return message.channel.send(insuficiente);

    
    client.rmv(message.guild.id, message.author.id, parseInt(args[0]));
    client.addb(message.guild.id, message.author.id, parseInt(args[0])) 

    const save = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Haz depositado " +
          sim +
          parseInt(args[0]).toLocaleString() +
          " en el banco"
      )
      .setColor("GREEN")
      .setTimestamp();
    message.channel.send(save);
  }
};
