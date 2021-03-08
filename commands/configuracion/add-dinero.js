const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");

module.exports = {
  name: "add-dinero",
  description: "Añade dinero a un usuario o los usuarios que tengan un rol",
  cooldown: 5,
  aliases: ["add dinero", "addmoney"],
  args: true,
  usage: "<usuario | rol> <dinero>",
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

    let data = await economy.findOne({
      GuildID: message.guild.id
    });
    const opciones = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> Agrega replicas de crimenes o pirateria si los usuarios fallan, junto con sus respuestas"
      )
      .addField(
        "Ejemplo",
        `\`${prefix}add-dinero <banco | mano> <rol | usuario> <dinero>\``
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0] || !["mano", "banco"].includes(args[0].toLowerCase()))
      return message.channel.send(opciones);

    if (args[0].toLowerCase() == "mano") {
      let rol = message.mentions.roles.first()
      let member = message.mentions.members.first();

      const user = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "Menciona un usuario o rol y proporciona el dinero a añadir"
        )
        .setColor("RED")
        .setTimestamp();
      if (!args[1]) return message.channel.send(user);

      if (rol) {
        let members = message.guild.members.cache
          .filter(a => a.roles.cache.has(rol.id))
          .map(a => a.id);
        await members.forEach(a => client.add(message.guild.id, a, 100));
        message.channel.send("Money added to users with that role");
      } else if(member) {
        client.add(message.guild.id, member.id, 100)
        message.channel.send("Money was added to that member") 
      } 
    }
  }
};
