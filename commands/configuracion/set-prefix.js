const Discord = require("discord.js");
const db = require("megadb")

module.exports = {
  name: "set-prefix",
  description: "Establece un prefix para el servidor",
  cooldown: 5,
  aliases: ["setprefix"],
  args: true,
  usage: "<argumento>",
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
    
    const falta = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Establece el nuevo prefix para el servidor"
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0]) return message.channel.send(falta);
    
    const largo = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Un prefix mayor a 3 caracteres se ve innecesario"
      )
      .setColor("RED")
      .setTimestamp();
    if (args.join(" ").length > 3) return message.channel.send(largo);
    
    let prefixDB = new db.crearDB("prefixDB")
    prefixDB.set(message.guild.id, args.join(" "))
    
    const ya = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "🤠 El prefix de este servidor ha sido establecido a " + args.join(" ")
      )
      .setColor("RED")
      .setTimestamp();
    message.channel.send(ya)
  }
}