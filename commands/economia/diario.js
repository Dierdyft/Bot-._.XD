const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const db = require("quick.db");
const hd = require("humanize-duration");

module.exports = {
  name: "diario",
  description: "Consigue dinero diariamente",
  cooldown: 5,
  aliases: ["daily"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await economy.findOne({
      GuildID: message.guild.id
    });
    if (!data) data = await economy.create({ GuildID: message.guild.id });

    let usuario = db.fetch(
      `TimerDaily_${message.guild.id}.${message.author.id}`
    );

    if (Date.now() < usuario) {
      let restante = usuario - Date.now();
      let tiempo_restante = hd(restante, { language: "es" });

      const falta_tiempo = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolduerme:811087907891970089> Debes esperar " +
            tiempo_restante +
            " para volver a obtener una recompensa diaria"
        )
        .setColor("RED")
        .setTimestamp();
      return message.channel.send(falta_tiempo);
    }

    let symbol = data.currency;

    client.add(message.guild.id, message.author.id, 1000);

    const reclamado = new Discord.MessageEmbed()
      .setAuthor(
        client.user.tag,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolsmile:811088100909645866> Haz reclamado una recompensa diaria de " +
          symbol +
          "1000"
      )
      .setColor("GREEN")
      .setFooter(
        "¿Quieres una recompensa adicional? Únete al servidor de soporte y reclamala"
      );
    message.channel.send(reclamado);

    db.delete(`TimerDaily_${message.guild.id}.${message.author.id}`);
    db.add(
      `TimerDaily_${message.guild.id}.${message.author.id}`,
      Date.now() + 86400000
    );
  }
};
