const Discord = require("discord.js") 
const economy = require("../../database/models/economy.js")

module.exports = {
  name: "set-moneda",
  description: "Establece una moneda para el servidor",
  cooldown: 5,
  aliases: ["set moneda", "setmoneda"],
  args: true,
  usage: "<moneda>",
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
    })
    
    const que_signo = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> Proporciona la nueva moneda para el servidor"
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0]) return message.channel.send(que_signo);

    const listo = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
     .setDescription("<:coolsmile:811088100909645866> La moneda del servidor ha sido cambiada a "+args[0])
     .setColor("GREEN")
     .setTimestamp()
  
    if(data) {
      
      await data.updateOne({
        GuildID: message.guild.id,
        currency: args[0]
      })
      message.channel.send(listo) 
     } else {
       
       let newData = new economy({
         GuildID: message.guild.id,
         currency: args[0]
       }) 
       await newData.save()
       message.channel.send(listo) 
     } 
   } 
 } 