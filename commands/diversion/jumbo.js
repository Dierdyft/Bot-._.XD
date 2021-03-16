const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const svg2img = require("node-svg2img");

module.exports = {
  name: "jumbo",
  description: "Expande el tamaño de todo tipo de emoji",
  cooldown: 5,
  aliases: [], 
  args: true, 
  usage: "<emoji> [tamaño]",
  execute: async (client, message, args, prefix) => {
    try {
      const emoji = args[0];

      const falta = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )

        .setDescription(
          "<a:nocool:811087996832710676> Proporciona un emoji a expandir"
        )
        .setColor("RED")
        .setTimestamp();
      if (!emoji) return message.channel.send(falta);

      const number = parseInt(args.slice(1).join(" "));
      const size = number && (number <= 1024 && number > 0) ? number : 150;

      const regexp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(
        `${emoji}`
      );

      const err = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<a:nocool:811087996832710676> El emoji proporcionado no es valido"
        )
        .setColor("RED")
        .setTimestamp();
      if (!regexp) return message.channel.send(err);

      const a = parse(`${emoji}`);
      const b = a[0].url;
      svg2img(b, { format: "png", width: size, height: size }, function(
        err,
        data
      ) {
        const ab = new Discord.MessageAttachment(data, "Jumbo.png");
        const EmbeD = new Discord.MessageEmbed() 
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})) 
        .setDescription("Usa **"+prefix+"jumbo <emoji> <tamaño>** para redimensionar la imagen") 
        .attachFiles([ab]) 
        .setImage("attachment://Jumbo.png")
        .setColor("RANDOM") 
        message.channel.send(EmbeD);
      });
    } catch (e) {
      const error = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<a:nocool:811087996832710676> El emoji proporcionado no es valido"
        )
        .setColor("RED")
        .setTimestamp();
      return message.channel.send(error);
    }
  }
};
