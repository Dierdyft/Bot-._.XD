const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const db = require("quick.db");
const hd = require("humanize-duration");

module.exports = {
  name: "robar",
  description: "Roba dinero a los usuarios",
  cooldown: 5,
  aliases: ["rob", "hurt"],
  args: true,
  usage: "<usuario>",
  execute: async (client, message, args, prefix) => {
    
    let data = await economy.findOne({
      GuildID: message.guild.id
    });
    if (!data) data = await economy.create({ GuildID: message.guild.id });
    
    let sim = data.currency
    
    let mi_bal = await client.bal(message.guild.id, message.author.id) 
    
    let member = message.mentions.members.first() 
    
    const menciona = new Discord.MessageEmbed() 
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
    .setDescription("<a:nocool:811087996832710676> ¿A quien vas a robar amigo?") 
    .setColor("RED") 
    .setTimestamp() 
    if(!member) return message.channel.send(menciona) 
    
    const qeee = new Discord.MessageEmbed() 
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
    .setDescription("<a:nocool:811087996832710676> No, calmado man") 
    .setColor("RED") 
    .setTimestamp() 
    if(member.id == client.user.id) return message.channel.send(qeee) 
    
     const quede = new Discord.MessageEmbed() 
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
    .setDescription("<a:nocool:811087996832710676> When te robas a ti mismo") 
    .setColor("RED") 
    .setTimestamp() 
    if(member.id == message.author.id) return message.channel.send(quede) 
    
    let member_bal = await client.bal(message.guild.id, member.id) 
    
    const no_tiene = new Discord.MessageEmbed() 
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
    .setDescription("<a:nocool:811087996832710676> **"+member.user.tag+"** no tiene dinero para robar") 
    .setColor("RED") 
    .setTimestamp() 
    if(member_bal < 0) return message.channel.send(no_tiene) 
  
     let aleatorio = Math.round(Math.random() * 100);

    let ganancias = Math.floor(
      Math.random() * (member_bal - 0 + 1) + member_bal 
    );
    
   if(aleatorio <= 60){
     
     client.add(message.guild.id, message.author.id, ganancias) 
     client.rmv(message.guild.id, member.id, ganancias) 

     const robado = new Discord.MessageEmbed() 
     .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
     .setDescription("<:coolhappy:816349108939128882> Le has robado a **"+member.user.tag+"** una cantidad de "+sim+ganancias.toLocaleString()) 
     .setColor("GREEN") 
     .setTimestamp() 
     message.channel.send(robado) 
  
   } else {
     
     client.rmv(message.guild.id, message.author.id, ganancias) 

     const Norobado = new Discord.MessageEmbed() 
     .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
     .setDescription("<:risas:804921819341127751> No has podido robar a **"+member.user.tag+"** y pierdes "+sim+ganancias.toLocaleString()) 
     .setColor("RED") 
     .setTimestamp() 
     message.channel.send(Norobado) 
    } 
  }
};
