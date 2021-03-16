const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "lvlmensaje",
  description: "Establece un mensaje cuando las personas suban de nivel",
  cooldown: 5,
  aliases: ["lvlmsg", "lvlmessage"],
  args: true,
  usage: "<argumentos>",
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

    const elMensaje = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Establece el mensaje cuando las personas suban de nivel"
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0]) return message.channel.send(elMensaje);

    const aunNo = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> El mensaje debe incluir [level] para hacerle saber al usuario su nivel y [user] para el usuario que subió de nivel"
      )
      .addField(
        "Ejemplo:",
        `\`${prefix}mensaje Felicitaciones [user], haz hablado y subiste a nivel [level]\``
      )
      .setColor("RED")
      .setTimestamp();
    if (!args.join(" ").includes("[user]")) return message.channel.send(aunNo);

    if (!args.join(" ").includes("[level]")) return message.channel.send(aunNo);

    await data.updateOne({
      Guild: message.guild.id,
      message: args.join(" ")
    });

    const ya = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription("😎 Se ha establecido el mensaje cuando suban de nivel")
      .setColor("GREEN")
      .setTimestamp();
    message.channel.send(ya);
  }
};
