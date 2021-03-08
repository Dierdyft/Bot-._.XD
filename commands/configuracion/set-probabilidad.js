const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");

module.exports = {
  name: "set-probabilidad",
  description: "Establece probabilidades a los distintos métodos de ganar dinero",
  cooldown: 5,
  aliases: ["setprobabilidad", "set probabilidad", "setprob"],
  args: true,
  usage: "<trabajo | crimen | pirata | hack> <probabilidad>",
  execute: async (client, message, args, prefix) => {
    const permiso = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dyamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Ya quisieras,tienes qe tener el permiso __ADINISTRADOR__"
      )
      .setColor("RED")
      .setTimestamp();

    let data = await economy.findOne({
      GuildID: message.guild.id
    });

    const opciones = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> Establece las probabilidades de crimenes, piratería o hacks"
      )
      .addField("Ejemplo", `\`${prefix}set-probabilidad <crimen | hack | pirata> <probabilidad>\``) 
      .setColor("RED")
      .setTimestamp();
    if (
      !args[0] ||
      !["crimen", "hack", "pirata"].includes(args[0].toLowerCase())
    )
      return message.channel.send(opciones);

    if (args[0].toLowerCase() == "crimen") {
      const val = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> La probabilidad debe ser un número entre 1% - 100%"
        )
        .addField("Ejemplo", `\`${prefix}set-probabilidad <crimen> <probabilidad>\``) 
        .setColor("RED")
        .setTimestamp();
      if (
        !args[1] ||
        isNaN(args[1]) ||
        parseInt(args[1]) < 1 ||
        parseInt(args[1]) > 100
      )
        return message.channel.send(val);

      const add = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolsmile:811088100909645866> La probabilidad de crimen ha sido establecida a " +
            args[1]+"%" 
        )
        .setColor("GREEN")
        .setTimestamp();

      if (data) {
        await data.updateOne({
          GuildID: message.guild.id,
          crimen_probabilidad: parseInt(args[1])
        });
        message.channel.send(add);
      } else {
        let newData = new economy({
          GuildID: message.guild.id,
          crimen_probabilidad: parseInt(args[1])
        });
        await newData.save();
        message.channel.send(add);
      }
    }

    if (args[0].toLowerCase() == "pirata") {
      const val = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> La probabilidad debe ser un número entre 1% - 100%"
        )
        .addField("Ejemplo", `\`${prefix}set-probabilidad <pirata> <probabilidad>\``) 
        .setColor("RED")
        .setTimestamp();
      if (
        !args[1] ||
        isNaN(args[1]) ||
        parseInt(args[1]) < 1 ||
        parseInt(args[1]) > 100
      )
        return message.channel.send(val);

      const add = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolsmile:811088100909645866> La probabilidad de pirateria ha sido establecida a " +
            args[1]+"%" 
        )
        .setColor("GREEN")
        .setTimestamp();
      if (data) {
        await data.updateOne({
          GuildID: message.guild.id,
          pirateria_probabilidad: parseInt(args[1])
        });
        message.channel.send(add);
      } else {
        let newData = new economy({
          GuildID: message.guild.id,
          pirateria_probabilidad: parseInt(args[1])
        });
        await newData.save();
        message.channel.send(add);
      }
    }
    if (args[0].toLowerCase() == "hack") {
      const val = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> La probabilidad debe ser un número entre 1% - 100%"
        )
        .addField("Ejemplo", `\`${prefix}set-probabilidad <hack> <probabilidad>\``) 
        .setColor("RED")
        .setTimestamp();
      if (
        !args[1] ||
        isNaN(args[1]) ||
        parseInt(args[1]) < 1 ||
        parseInt(args[1]) > 100
      )
        return message.channel.send(val);

      const add = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolsmile:811088100909645866> La probabilidad de hack ha sido establecida a " +
            args[1]+"%" 
        )
      .setColor("GREEN")
        .setTimestamp();
      if (data) {
        await data.updateOne({
          GuildID: message.guild.id,
          hack_probabilidad: parseInt(args[1])
        });
        message.channel.send(add);
      } else {
        let newData = new economy({
          GuildID: message.guild.id,
          hack_probabilidad: parseInt(args[1])
        });
        await newData.save();
        message.channel.send(add);
      }
    }
  }
};
