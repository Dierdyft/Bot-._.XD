const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "lvladd-role",
  description: "Otorga un role cuando lleguen a cierto nivel",
  cooldown: 5,
  aliases: ["lvlar"],
  args: true,
  usage: "<role> <nivel>",
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
    }) 
    
    if(!data) data = await level.create({Guild: message.guild.id}) 
    
    const roll = message.mentions.roles.first() 
    
    const mencion = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Menciona un role a añadir al llegar a cierto nivel"
      )
      .setColor("RED")
      .setTimestamp();
    if(!roll) return message.channel.send(mencion) 
    
    const number = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Establece el nivel para otorgar el role"
      )
      .setColor("RED")
      .setTimestamp();
    if(!args[1]) return message.channel.send(number) 
    
    const noo = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> El nivel proporcionado es inválido, el máximo es hasta nivel 100"
      )
      .setColor("RED")
      .setTimestamp();
    if(parseInt(args[1]) < 1 || parseInt(args[1]) > 100) return message.channel.send(noo) 
    
    let role_add = data.roles.find(x => x.rol == roll.id);

    const ya_esta = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Este role ya estaba ingresado"
      )
      .setColor("RED")
      .setTimestamp();
    if(role_add) return message.channel.send(ya_esta) 
    
    let lvl_add = data.roles.find(x => x.lvl == parseInt(args[1]));
    
    const ya_nivel = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Ya hay un recompensa para ese nivel"
      )
      .setColor("RED")
      .setTimestamp();
    if(lvl_add) return message.channel.send(ya_nivel) 
    
    const add = new Discord.MessageEmbed() 
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
    .setDescription(`Se ha añadido la recompensa ${args[0]} al llegar al nivel **${args[1]}**`) 
    .setColor("GREEN") 
    .setTimestamp() 
    
    if(data) {
      data.roles.unshift({
          rol: roll.id,
          lvl: parseInt(args[1]) 
        });
        data.save();
      message.channel.send(add) 
    } else if(!data) {
      let newData = new level({
          Guild: message.guild.id,
          roles: [
            {
              rol: roll.id, 
              lvl: parseInt(args[1]) 
            }
          ]
        });
        newData.save();
      message.channel.send(add) 
    } 
  }
} 

    