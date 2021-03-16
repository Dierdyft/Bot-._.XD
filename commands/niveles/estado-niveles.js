const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "estado-niveles",
  description:
    "Mira la configuración completa del sistema de niveles en el servidor",
  cooldown: 5,
  aliases: ["status-levels", "en", "stt-lvl"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await level.findOne({
      Guild: message.guild.id
    });

    if (!data) data = await level.create({ Guild: message.guild.id });

    let organizar_rewards = data.roles.sort((a, b) => a.lvl - b.lvl);

    let rewards = organizar_rewards.map((v, i) => {
      return `**${i + 1}.** Nivel **${v.lvl}:** ${message.guild.roles
        .resolve(v.rol)
        .toString()}`;
    });
    if (organizar_rewards.length < 1) rewards = "Ninguna";

    let roles_list = data.ignore_roles.map((v, i) => {
      return `**${i + 1}.** ${message.guild.roles
        .resolve(v)
        .toString()} | ${v}`;
    });
    if (roles_list.length < 1) roles_list = "Ninguno";

    let canales_list = data.ignore_channel.map((v, i) => {
      return `**${i + 1}.** ${message.guild.channels
        .resolve(v)
        .toString()} | ${v}`;
    });
    if (canales_list.length < 1) canales_list = "Ninguno";

    let lvlchannel = data.channel;
    if (!lvlchannel) {
      lvlchannel = "Ninguno";
    } else {
      lvlchannel = message.guild.channels.resolve(data.channel).name;
    }

    let trad = { "true": "Encendido", "false": "Apagado" } 
    const stt = new Discord.MessageEmbed()
      .setAuthor(
        "Sistema de niveles en " + message.guild.name,
        message.guild.iconURL({ dynamic: true })
      )
      .addField(
        "Experiencia",
        `**Minima:** ${data.exp_min}\n**Maxima:** ${data.exp_max}`
      )
      .addField("Recompensas", rewards)
      .addField("Roles ignorados", roles_list)
      .addField("Canales ignorados", canales_list)
      .addField(
        "Configuracion",
        `**Mensaje:** ${data.message}\n**Canal:** ${lvlchannel}\n**Sistema:** ${trad[data.toggle]}`
      )
      .setColor("BLUE")
      
    message.channel.send(stt);
  }
};
