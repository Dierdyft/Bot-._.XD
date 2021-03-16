const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "ignorar-canal",
  description: "Ignorar canales donde se gane experiencia",
  cooldown: 5,
  aliases: ["igc", "ignora-canal"],
  args: true,
  usage: "<canal>",
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

    let canal = message.mentions.channels.first();

    const menciona_canal = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> Menciona un canal donde no se dara experiencia, tambien puedes añadir mas"
      )
      .setColor("RED")
      .setTimestamp();
    if (!canal) return message.channel.send(menciona_canal);

    const canal_invalido = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> El canal que estas agregando no es de este servidor"
      )
      .setColor("RED")
      .setTimestamp();
    if (!message.guild.channels.cache.get(canal.id))
      return message.channel.send(canal_invalido);

    let busca_canal = data.ignore_channel.includes(canal.id);

    if (busca_canal) {
      const canal_ya_añadido = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:risan:817538141585276989> El canal que estas agregando ya estaba ingresado"
        )
        .setColor("RED")
        .setTimestamp();
      return message.channel.send(canal_ya_añadido);
    } else if (!busca_canal) {
      await data.updateOne({
        Guild: message.guild.id,
        $push: { ignore_channel: canal.id }
      });
      const añadido = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription("😎 Se ha agregado el canal " + args[0])
        .setColor("GREEN")
        .setTimestamp();
      message.channel.send(añadido);
    }
  }
};
