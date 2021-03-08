const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");

module.exports = {
  name: "set-pago",
  description: "Establece pagos a los distintos métodos de ganar dinero",
  cooldown: 5,
  aliases: ["setpago", "setpayout"],
  args: true,
  usage: "<crimen | trabajo | pirata | hack> <min | max> <dinero>",
  execute: async (client, message, args, prefix) => {
    const permiso = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Ya quisieras, tienes que tener el permiso __ADMINISTRADOR__"
      )
      .setColor("RED")
      .setTimestamp();
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(permiso);

    let data = await economy.findOne({
      GuildID: message.guild.id
    });

    const opciones = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> Establece el pago de trabajos, crimenes, piratería o hacks"
      )
      .setColor("RED")
      .setTimestamp();
    if (
      !args[0] ||
      !["trabajo", "crimen", "hack", "pirata"].includes(args[0].toLowerCase())
    )
      return message.channel.send(opciones);

    if (args[0].toLowerCase() == "trabajo") {
      const min_max = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Establece el pago de mínimo o máximo y proporciona su valor"
        )
        .setColor("RED")
        .setTimestamp();
      if (!args[1] || !["min", "max"].includes(args[1].toLowerCase()))
        return message.channel.send(min_max);

      if (args[1].toLowerCase() == "min") {
        const num = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolmeh:811088359212449792> Establece la cantidad del pago mínimo en números"
          )
          .setColor("RED")
          .setTimestamp();
        if (!args[2] || isNaN(args[2])) return message.channel.send(num);

        const min_ya = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolsmile:811088100909645866> Se ha establecido el pago mínimo de trabajo a " +
              args[2]
          )
          .setColor("GREEN")
          .setTimestamp();
        if (data) {
          await data.updateOne({
            GuildID: message.guild.id,
            minMoneyWork: parseInt(args[2])
          });
          message.channel.send(min_ya);
        } else {
          let newData = new economy({
            GuildID: message.guild.id,
            minMoneyWork: parseInt(args[2])
          });
          await newData.save();
          message.channel.send(min_ya);
        }
      }
      if (args[1].toLowerCase() == "max") {
        const num = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolmeh:811088359212449792> Establece la cantidad del pago máximo en números"
          )
          .setColor("RED")
          .setTimestamp();
        if (!args[2] || isNaN(args[2])) return message.channel.send(num);

        const max_ya = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolsmile:811088100909645866> Se ha establecido el pago maximo de trabajo a " +
              args[2]
          )
          .setColor("GREEN")
          .setTimestamp();
        if (data) {
          await data.updateOne({
            GuildID: message.guild.id,
            maxMoneyWork: parseInt(args[2])
          });
          message.channel.send(max_ya);
        } else {
          let newData = new economy({
            GuildID: message.guild.id,
            maxMoneyWork: parseInt(args[2])
          });
          await newData.save();
          message.channel.send(max_ya);
        }
      }
    }

    if (args[0].toLowerCase() == "crimen") {
      const min_max = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Establece el pago de mínimo o máximo y proporciona su valor"
        )
        .setColor("RED")
        .setTimestamp();
      if (!args[1] || !["min", "max"].includes(args[1].toLowerCase()))
        return message.channel.send(min_max);

      if (args[1].toLowerCase() == "min") {
        const num = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolmeh:811088359212449792> Establece la cantidad del pago mínimo en números"
          )
          .setColor("RED")
          .setTimestamp();
        if (!args[2] || isNaN(args[2])) return message.channel.send(num);

        const min_ya = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolsmile:811088100909645866> Se ha establecido el pago mínimo de crimen a " +
              args[2]
          )
          .setColor("GREEN")
          .setTimestamp();
        if (data) {
          await data.updateOne({
            GuildID: message.guild.id,
            minMoneyCrime: parseInt(args[2])
          });
          message.channel.send(min_ya);
        } else {
          let newData = new economy({
            GuildID: message.guild.id,
            minMoneyCrime: parseInt(args[2])
          });
          await newData.save();
          message.channel.send(min_ya);
        }
      }
      if (args[1].toLowerCase() == "max") {
        const num = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolmeh:811088359212449792> Establece la cantidad del pago máximo en números"
          )
          .setColor("RED")
          .setTimestamp();
        if (!args[2] || isNaN(args[2])) return message.channel.send(num);

        const max_ya = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolsmile:811088100909645866> Se ha establecido el pago maximo de crimen a " +
              args[2]
          )
          .setColor("GREEN")
          .setTimestamp();
        if (data) {
          await data.updateOne({
            GuildID: message.guild.id,
            maxMoneyCrime: parseInt(args[2])
          });
          message.channel.send(max_ya);
        } else {
          let newData = new economy({
            GuildID: message.guild.id,
            maxMoneyCrime: parseInt(args[2])
          });
          await newData.save();
          message.channel.send(max_ya);
        }
      }
    }
    if (args[0].toLowerCase() == "pirata") {
      const min_max = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Establece el pago de mínimo o máximo y proporciona su valor"
        )
        .setColor("RED")
        .setTimestamp();
      if (!args[1] || !["min", "max"].includes(args[1].toLowerCase()))
        return message.channel.send(min_max);

      if (args[1].toLowerCase() == "min") {
        const num = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolmeh:811088359212449792> Establece la cantidad del pago mínimo en números"
          )
          .setColor("RED")
          .setTimestamp();
        if (!args[2] || isNaN(args[2])) return message.channel.send(num);

        const min_ya = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolsmile:811088100909645866> Se ha establecido el pago mínimo de piratería a " +
              args[2]
          )
          .setColor("GREEN")
          .setTimestamp();
        if (data) {
          await data.updateOne({
            GuildID: message.guild.id,
            minMoneyPirateria: parseInt(args[2])
          });
          message.channel.send(min_ya);
        } else {
          let newData = new economy({
            GuildID: message.guild.id,
            minMoneyPirateria: parseInt(args[2])
          });
          await newData.save();
          message.channel.send(min_ya);
        }
       } 
      if (args[1].toLowerCase() == "max") {
        const num = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolmeh:811088359212449792> Establece la cantidad del pago máximo en números"
          )
          .setColor("RED")
          .setTimestamp();
        if (!args[2] || isNaN(args[2])) return message.channel.send(num);

        const max_ya = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolsmile:811088100909645866> Se ha establecido el pago maximo de pirateria a " +
              args[2]
          )
          .setColor("GREEN")
          .setTimestamp();
        if (data) {
          await data.updateOne({
            GuildID: message.guild.id,
            maxMoneyPirateria: parseInt(args[2])
          });
          message.channel.send(max_ya);
        } else {
          let newData = new economy({
            GuildID: message.guild.id,
            maxMoneyPirateria: parseInt(args[2])
          });
          await newData.save();
          message.channel.send(max_ya);
        }
      }
     } 
  }
};
