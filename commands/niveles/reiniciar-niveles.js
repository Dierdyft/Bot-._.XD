const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "reiniciar-niveles",
  description: "Reinicia el sistema de niveles por completo en el servidor",
  cooldown: 5,
  aliases: ["reset-levels", "rn"],
  args: true,
  usage: "",
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

    let tabla = await DiscordXp.fetchLeaderboard(message.guild.id, 5);

    const sinXP = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> No hay ningún usuario con experiencia en el servidor"
      )
      .setColor("RED")
      .setTimestamp();
    if (tabla.length < 1) return message.channel.send(sinXP);

    const filtro = m => m.author.id == message.author.id;
    const opciones = { time: 10000, max: 1, errors: ["time"] };

    const apta = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription("😳 ¿Estas seguro de reiniciar el sistema de niveles?")
      .setFooter("Acepta con 'si', o rechaza escribiendo cualquier cosa")
      .setColor("YELLOW");

    const rechazo = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription("😐 Haz cancelado el proceso de reinicio")
      .setColor("RED")
      .setTimestamp();

    const acepta = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<a:loadingmad:807848256264077313> Dame unos segundos para reiniciar el sistema"
      )
      .setColor("GREEN")
      .setTimestamp();

    const finalizado = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolflus:816349131625857074> Se han establecido los niveles de los usuarios a 0"
      )
      .setColor("GREEN")
      .setTimestamp();

    message.channel.send(apta);
    await message.channel.awaitMessages(filtro, opciones).then(async msg => {
      if (msg.first().content.toLowerCase() !== "si") {
        return message.channel.send(rechazo);
      }
      if (msg.first().content.toLowerCase() == "si") {
        message.channel.send(acepta);
        let ranking = await DiscordXp.computeLeaderboard(client, tabla);
        await ranking.map(e => DiscordXp.deleteUser(e.userID, message.guild.id));

        message.channel.send(finalizado);
      }
    }).catch(() => {
      return message.channel.send(rechazo)
    })
  }
};
