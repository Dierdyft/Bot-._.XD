const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "exp-maxima",
  description: "Establece la experiencia maxima a ganar",
  cooldown: 5,
  aliases: ["exp maxima", "exp-max", "exp max"],
  args: true,
  usage: "<numero>",
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

    let data = await level.findOne({
      Guild: message.guild.id
    });

    if (!data) data = await level.create({ Guild: message.guild.id });

    const expe = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> Especifica la experiencia maxima a ganar"
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0] || isNaN(args[0])) return message.channel.send(expe);

    const invalido = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> La cantidad proporcionada es invalida, quizas porque es mayor a 50"
      )
      .setColor("RED")
      .setTimestamp();
    if (parseInt(args[0]) > 50) return message.channel.send(invalido);

    const mayor = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> La cantidad proporcionada es menor que la experiencia mínima ["+data.exp_min+"]"
      )
      .setColor("RED")
      .setTimestamp();
    if (parseInt(args[0]) < data.exp_min) return message.channel.send(mayor);

    await data.updateOne({
      Guild: message.guild.id,
      exp_max: parseInt(args[0])
    });

    const seteado = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription("😎 Se ha establecido la experiencia maxima a " + args[0])
      .setColor("GREEN")
      .setTimestamp();
    message.channel.send(seteado);
  }
};
