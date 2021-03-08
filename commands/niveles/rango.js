const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "rango",
  description: "Mira tu rango",
  cooldown: 5,
  aliases: ["level", "rank", "nivel", "lvl"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    const user = message.mentions.users.first() || message.author;

    const userXp = await DiscordXp.fetch(user.id, message.guild.id);

     const sinXP = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> No tiene/s nada de experiencia"
      )
      .setColor("RED")
      .setTimestamp();
    if (!userXp) return message.channel.send(sinXP);

    const needXp = DiscordXp.xpFor(parseInt(userXp.level + 1));

    const rank = new canvacord.Rank()
      .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
      .setCurrentXP(userXp.xp)
      .setLevel(userXp.level)
      .setRequiredXP(needXp)
      .setStatus(user.presence.status)
      .setProgressBar("#F7FE2E", "COLOR")
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
    rank.build().then(data => {
      const img = new Discord.MessageAttachment(data, "rango.png");
      message.channel.send(img);
    });
  }
};
