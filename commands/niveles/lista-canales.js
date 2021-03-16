const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "lista-canales",
  description: "Mira la lista de canales ignorados a ganar experiencia",
  cooldown: 5,
  aliases: ["lc"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await level.findOne({ Guild: message.guild.id });
    if (!data) data = await level.create({ Guild: message.guild.id });

    console.log(data.roles);

    let organizar_rewards = data.ignore_channel.map((v, i) => {
      return `**${i + 1}.** ${message.guild.channels.resolve(v).toString()} | ${v}`;
    });

    const lol = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> No hay canales en la lista de canales ignorados"
      )
      .setColor("RED")
      .setFooter("Puedes añadir canales con " + prefix + "ignorar-canal");
    if (organizar_rewards < 1) return message.channel.send(lol);

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        "Canales ignorados en " + message.guild.name,
        message.guild.iconURL({ dynamic: true })
      )
      .setDescription(organizar_rewards)
      .setColor("BLUE");
    message.channel.send(embed);
  }
};
