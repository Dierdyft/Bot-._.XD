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
      .setCustomStatusColor("#FFFF00")
      .setProgressBar("#FFFF00", "COLOR")
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
    /*.setBackground(
        "IMAGE",
        "https://cdn.discordapp.com/attachments/798395093161738240/818518920549236736/0-3786_cute-emoji-background-wallpaper-hd-emoji-background.jpg"
      );
    */
    const buffer = await rank.build();
    const image = canvacord.write(buffer, "rango.png");
    message.channel.send({ files: [buffer] });
  }
};
