const Discord = require("discord.js");
const level = require("../../database/models/level.js");

module.exports = {
  name: "subida",
  description: "Para activar o desactivar la subida de niveles",
  cooldown: 5,
  aliases: ["leveling"],
  args: true,
  usage: "<on | off>",
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

    let data = await level.findOne({ Guild: message.guild.id });
    if (!data) data = await level.create({ Guild: message.guild.id });

    const elije = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> Activa el sistema de niveles con `on` y desactivalo con `off`"
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0] || !["on", "off"].includes(args[0].toLowerCase()))
      return message.channel.send(elije);

    if (args[0].toLowerCase() == "on") {
      const ya = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:risan:817538141585276989> El sistema de niveles ya se encontraba activado"
        )
        .setColor("RED")
        .setTimestamp();
      if (data.toggle == true) return message.channel.send(ya);

      await data.updateOne({
        Guild: message.guild.id,
        toggle: true
      });

      const listo = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolhappy:816349108939128882> El sistema de niveles ha sido activado"
        )
        .setColor("GREEN")
        .setTimestamp();
      message.channel.send(listo);
    }
    
    if (args[0].toLowerCase() == "off") {
      const ya = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:risan:817538141585276989> El sistema de niveles ya se encontraba desactivado"
        )
        .setColor("RED")
        .setTimestamp();
      if (data.toggle == false) return message.channel.send(ya);

      await data.updateOne({
        Guild: message.guild.id,
        toggle: false 
      });

      const listO = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolhappy:816349108939128882> El sistema de niveles ha sido desactivado"
        )
        .setColor("GREEN")
        .setTimestamp();
      message.channel.send(listO);
    }
  }
};
