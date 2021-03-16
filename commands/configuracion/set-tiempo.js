const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const ms = require("ms");
const hd = require("humanize-duration");

module.exports = {
  name: "set-tiempo",
  description: "Establece el tiempo de uso de cada método para obtener dinero",
  cooldown: 5,
  aliases: ["set tiempo", "settiempo", "settime"],
  args: true,
  usage: "<trabajo | crimen | pirata | hack>",
  execute: async (client, message, args, prefix) => {
    const permiso = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dyamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Ya quisieras, tienes que tener el permiso __ADINISTRADOR__"
      )
      .setColor("RED")
      .setTimestamp();
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(permiso) 

    let data = await economy.findOne({
      GuildID: message.guild.id
    });

    const opciones = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> Establece el tiempo de espera de trabajo, crimen, piratería o hacks"
      )
      .addField(
        "Ejemplo",
        `\`${prefix}set-tiempo <trabajo | crimen | hack | pirata> <tiempo>\``
      )
      .setColor("RED")
      .setTimestamp();
    if (
      !args[0] ||
      !["trabajo", "crimen", "hack", "pirata"].includes(args[0].toLowerCase())
    )
      return message.channel.send(opciones);

    let tiempo = ms(args[1]);

    if (args[0].toLowerCase() == "crimen") {
      const val = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> El tiempo debe ser un número mayor a 2 minutos"
        )
        .addField("Ejemplo", `\`${prefix}set-tiempo <crimen> <tiempo>\``)
        .setColor("RED")
        .setTimestamp();
      if (!args[1] || isNaN(tiempo) || tiempo < 120000)
        return message.channel.send(val);

      const malTiempo = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> El valor de tiempo proporcionado es invalido, debe ser minutos, horas o dias"
        )
        .addField("Ejemplo", `\`${prefix}set-tiempo <crimen> <tiempo>\``)
        .setColor("RED")
        .setTimestamp();
      if (
        !args[1].endsWith("m") &&
        !args[1].endsWith("h") &&
        !args[1].endsWith("d")
      )
        return message.channel.send(malTiempo);
      
      const listo = new Discord.MessageEmbed() 
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
      .setDescription("<:coolsmile:811088100909645866> Se ha establecido el tiempo de crimen a "+hd(tiempo, {language: "es"}))
      .setColor("GREEN")
      .setTimestamp() 
      if(data) {
        await data.updateOne({
          GuildID: message.guild.id, 
          TimeCrime: tiempo
        })
        message.channel.send(listo) 
       } else {
         let newData = new economy({
          GuildID: message.guild.id, 
          TimeCrime: tiempo
        })
         await newData.save()
        message.channel.send(listo) 
       } 
    }
    if (args[0].toLowerCase() == "trabajo") {
      const val = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> El tiempo debe ser un número mayor a 2 minutos"
        )
        .addField("Ejemplo", `\`${prefix}set-tiempo <trabajo> <tiempo>\``)
        .setColor("RED")
        .setTimestamp();
      if (!args[1] || isNaN(tiempo) || tiempo < 120000)
        return message.channel.send(val);

      const malTiempo = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> El valor de tiempo proporcionado es invalido, debe ser minutos, horas o dias"
        )
        .addField("Ejemplo", `\`${prefix}set-tiempo <trabajo> <tiempo>\``)
        .setColor("RED")
        .setTimestamp();
      if (
        !args[1].endsWith("m") &&
        !args[1].endsWith("h") &&
        !args[1].endsWith("d")
      )
        return message.channel.send(malTiempo);
      
      const listo = new Discord.MessageEmbed() 
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
      .setDescription("<:coolsmile:811088100909645866> Se ha establecido el tiempo de trabajo a "+hd(tiempo, {language: "es"}))
      .setColor("GREEN")
      .setTimestamp() 
      if(data) {
        await data.updateOne({
          GuildID: message.guild.id, 
          TimeWork: tiempo
        })
        message.channel.send(listo) 
       } else {
         let newData = new economy({
          GuildID: message.guild.id, 
          TimeWork: tiempo
        })
         await newData.save()
        message.channel.send(listo) 
       } 
    }
    if (args[0].toLowerCase() == "pirata") {
      const val = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> El tiempo debe ser un número mayor a 2 minutos"
        )
        .addField("Ejemplo", `\`${prefix}set-tiempo <pirata> <tiempo>\``)
        .setColor("RED")
        .setTimestamp();
      if (!args[1] || isNaN(tiempo) || tiempo < 120000)
        return message.channel.send(val);

      const malTiempo = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> El valor de tiempo proporcionado es invalido, debe ser minutos, horas o dias"
        )
        .addField("Ejemplo", `\`${prefix}set-tiempo <pirata> <tiempo>\``)
        .setColor("RED")
        .setTimestamp();
      if (
        !args[1].endsWith("m") &&
        !args[1].endsWith("h") &&
        !args[1].endsWith("d")
      )
        return message.channel.send(malTiempo);
      
      const listo = new Discord.MessageEmbed() 
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
      .setDescription("<:coolsmile:811088100909645866> Se ha establecido el tiempo de pirateria a "+hd(tiempo, {language: "es"}))
      .setColor("GREEN")
      .setTimestamp() 
      if(data) {
        await data.updateOne({
          GuildID: message.guild.id, 
          TimePirateria: tiempo
        })
        message.channel.send(listo) 
       } else {
         let newData = new economy({
          GuildID: message.guild.id, 
          TimePirateria: tiempo
        })
         await newData.save()
        message.channel.send(listo) 
       } 
    }
    if (args[0].toLowerCase() == "pirata") {
      const val = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> El tiempo debe ser un número mayor a 2 minutos"
        )
        .addField("Ejemplo", `\`${prefix}set-tiempo <pirata> <tiempo>\``)
        .setColor("RED")
        .setTimestamp();
      if (!args[1] || isNaN(tiempo) || tiempo < 120000)
        return message.channel.send(val);

      const malTiempo = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> El valor de tiempo proporcionado es invalido, debe ser minutos, horas o dias"
        )
        .addField("Ejemplo", `\`${prefix}set-tiempo <pirata> <tiempo>\``)
        .setColor("RED")
        .setTimestamp();
      if (
        !args[1].endsWith("m") &&
        !args[1].endsWith("h") &&
        !args[1].endsWith("d")
      )
        return message.channel.send(malTiempo);
      
      const listo = new Discord.MessageEmbed() 
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
      .setDescription("<:coolsmile:811088100909645866> Se ha establecido el tiempo de pirateria a "+hd(tiempo, {language: "es"}))
      .setColor("GREEN")
      .setTimestamp() 
      if(data) {
        await data.updateOne({
          GuildID: message.guild.id, 
          TimeHack: tiempo
        })
        message.channel.send(listo) 
       } else {
         let newData = new economy({
          GuildID: message.guild.id, 
          TimeHack: tiempo
        })
         await newData.save()
        message.channel.send(listo) 
       } 
    }
  }
};
