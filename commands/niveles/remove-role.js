const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "remove-role",
  description:
    "Remover un canal de la lista de canales ignorados a ganar experiencia",
  cooldown: 5,
  aliases: ["rmr"],
  args: true,
  usage: "<role>",
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

    let data = await level.findOne({
      Guild: message.guild.id
    });

    if (!data) data = await level.create({ Guild: message.guild.id });

    let rol = message.mentions.roles.first();

    const menciona_rol = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:risan:817538141585276989> Menciona un role a remover de la lista de ignorados"
      )
      .setColor("RED")
      .setTimestamp();
    if (!rol) return message.channel.send(menciona_rol);

    let busca_rol = data.ignore_roles.includes(rol.id);

    if (!busca_rol) {
      const rol_ya_añadido = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:risan:817538141585276989> El role que estas removiendo no esta en la lista de ignorados"
        )
        .setColor("RED")
        .setTimestamp();
      return message.channel.send(rol_ya_añadido);
    } else if (busca_rol) {
      await data.updateOne({
        Guild: message.guild.id,
        $pull: { ignore_roles: rol.id }
      });
      const añadido = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription("😎 Se ha removido el role " + args[0])
        .setColor("GREEN")
        .setTimestamp();
      message.channel.send(añadido);
    }
  }
};
