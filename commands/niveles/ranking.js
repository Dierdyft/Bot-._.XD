const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "ranking",
  description: "Mira los rangos",
  cooldown: 5,
  aliases: ["levels", "lvls"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let tabla = await DiscordXp.fetchLeaderboard(message.guild.id, 10);

    const sinXP = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> No hay ningún usuario con experiencia en este servidor"
      )
      .setColor("RED")
      .setTimestamp();
    if (tabla.length < 1) return message.channel.send(sinXP);

    let tabla_2 = await DiscordXp.computeLeaderboard(client, tabla);

    let rank = tabla_2.map(
      e =>
        `**${e.position}.** [${e.username}#${
          e.discriminator
        }](https://discord.gg/HV42DkNvvw) • **Nivel:** ${
          e.level
        } **Experiencia:** ${e.xp.toLocaleString()}`
    );

    let yo = await DiscordXp.fetch(message.author.id, message.guild.id);

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        "Tabla de posiciones en " + message.guild.name,
        message.guild.iconURL({ dynamic: true })
      )
      .setTitle("Tu nivel es de " + yo.level + "°")
      .setDescription(rank.join("\n"))
      .setColor("BLUE");
    message.channel.send(embed);
  }
};
