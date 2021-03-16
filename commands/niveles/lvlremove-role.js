const Discord = require("discord.js");
const level = require("../../database/models/level.js");
const DiscordXp = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "lvlremove-role",
  description: "Remover un role de las recompensas",
  cooldown: 5,
  aliases: ["lvlrmvr"],
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

    const roll = message.mentions.roles.first();

    const mencion = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Menciona un role a remover de las recompensas"
      )
      .setColor("RED")
      .setFooter("Si no sabes que roles hay, usa " + prefix + "lvlrecompensas");
    if (!roll) return message.channel.send(mencion);

    let role_add = data.roles.find(x => x.rol == roll.id);

    const ya_esta = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Este role no está en las recompensas"
      )
      .setColor("RED")
      .setFooter("Si no sabes que roles hay, usa " + prefix + "lvlrecompensas");
    if (!role_add) return message.channel.send(ya_esta);

    const remoc = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolsi:811088241495113768> Se ha removido " +
          args[0] +
          " de las recompensas"
      )
      .setColor("GREEN")
      .setTimestamp();

    if (role_add) {
      await data.updateOne({
        $pull: { roles: { rol: role_add.rol } }
      });

      message.channel.send(remoc);
    }
  }
};
