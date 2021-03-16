const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "lista-roles",
  description: "Mira la lista de roles ignorados a ganar experiencia",
  cooldown: 5,
  aliases: ["lr"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await level.findOne({ Guild: message.guild.id });
    if (!data) data = await level.create({ Guild: message.guild.id });

    let organizar_rewards = data.ignore_roles.map((v, i) => {
      return `**${i + 1}.** ${message.guild.roles.resolve(v).toString()} | ${v}`;
    });

    const lol = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> No hay roles en la lista de roles ignorados"
      )
      .setColor("RED")
      .setFooter("Puedes añadir roles con " + prefix + "ignorar-role");
    if (organizar_rewards < 1) return message.channel.send(lol);

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        "Roles ignorados en " + message.guild.name,
        message.guild.iconURL({ dynamic: true })
      )
      .setDescription(organizar_rewards)
      .setColor("BLUE");
    message.channel.send(embed);
  }
};
