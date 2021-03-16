const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "lvlrecompensas",
  description: "Mira las recompensas por llegar a ciertos niveles",
  cooldown: 5,
  aliases: ["lvlrewards", "lvlre"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await level.findOne({ Guild: message.guild.id });
    if (!data) data = await level.create({ Guild: message.guild.id });

    console.log(data.roles) 
    
    let organizar_rewards = data.roles.sort((a, b) => a.lvl - b.lvl);

    const lol = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> No hay recompensas en este servidor"
      )
      .setColor("RED")
      .setFooter("Puedes añadir recompensas con " + prefix + "lvladd-role");
    if (organizar_rewards < 1) return message.channel.send(lol);
    let rewards = organizar_rewards.map((v, i) => {
      return `**${i + 1}.** Nivel **${v.lvl}:** ${message.guild.roles
        .resolve(v.rol)
        .toString()}`;
    });

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        "Recompensas en " + message.guild.name,
        message.guild.iconURL({ dynamic: true })
      )
      .setDescription(rewards)
      .setColor("BLUE");
    message.channel.send(embed);
  }
};
