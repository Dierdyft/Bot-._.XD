const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "exp-minima",
  description: "Establece la experiencia minima a ganar",
  cooldown: 5,
  aliases: ["expminima", "exp-min"],
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
        "<:risan:817538141585276989> Especifica la experiencia minima a ganar"
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
        "<:risan:817538141585276989> La cantidad proporcionada es invalida, quizas porque es menor a 1"
      )
      .setColor("RED")
      .setTimestamp();
    if (parseInt(args[0]) < 1) return message.channel.send(invalido);

    const mayor = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> La cantidad proporcionada es mayor que la experiencia maxima["+data.exp_max+"]" 
      )
      .setColor("RED")
      .setTimestamp();
    if (parseInt(args[0]) > data.exp_max) return message.channel.send(mayor);

    await data.updateOne({
      Guild: message.guild.id,
      exp_min: parseInt(args[0])
    });

    const seteado = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription("😎 Se ha establecido la experiencia minima a " + args[0])
      .setColor("GREEN")
      .setTimestamp();
    message.channel.send(seteado);
  }
};
