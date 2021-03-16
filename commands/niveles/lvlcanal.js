const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "lvlcanal",
  description: "Establece un canal cuando las personas suban de nivel",
  cooldown: 5,
  aliases: ["lvlc", "lvlchannel"],
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

    const canal = message.mentions.channels.first();

    const mention = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:emoji_43:818509547911905281> Establece el canal donde se notificará quienes suben de nivel"
      )
      .setColor("RED")
      .setTimestamp();
    if (!canal) return message.channel.send(mention);
    
    const server = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:emoji_43:818509547911905281> El canal debe ser de este servidor"
      )
      .setColor("RED")
      .setTimestamp();
    if (!message.guild.channels.cache.get(canal.id)) return message.channel.send(server) 
    
    let data = await level.findOne({
      Guild: message.guild.id 
    }) 
    
    if(!data) data = await level.create({Guild: message.guild.id}) 
    
    await data.updateOne({
      Guild: message.guild.id, 
      channel: canal.id
    }) 
    
    const ya = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "😎 Se ha establecido el canal de subida de nivel"
      )
      .setColor("GREEN")
      .setTimestamp();
    message.channel.send(ya) 
  }
};
