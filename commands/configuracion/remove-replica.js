const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");

module.exports = {
  name: "remove-replica",
  description: "Remueve replicas registradas",
  cooldown: 5,
  aliases: ["remove replica", "rem-replica", "rem repply"],
  args: true,
  usage: "<trabajo | crimen | pirata> <ID>",
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
        "<:coolmeh:811088359212449792> Remueve replicas de trabajo, de crimenes o pirateria, junto con sus ID"
      )
      .addField(
        "Ejemplo",
        `\`${prefix}remove-replica <trabajo | crimen | pirata> <ID>\``
      )
      .setColor("RED")
      .setTimestamp();
    if (
      !args[0] ||
      !["trabajo", "crimen", "pirata"].includes(args[0].toLowerCase())
    )
      return message.channel.send(opciones);

    if (args[0].toLowerCase() == "trabajo") {
      const content = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Proporciona una ID de una réplica de trabajo"
        )
        .addField("Ejemplo", `\`${prefix}remove-replica <trabajo> <ID>\``)
        .setColor("RED")
        .setTimestamp();
      if (!args[1]) return message.channel.send(content);

      let dato = data.trabajos.find(x => x.numero == parseInt(args[1]));

      const rmv = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<a:coool:811088296762409022> Se ha removido la réplica de ID " +
            args[1]
        )
        .setColor("GREEN")
        .setTimestamp();

      if (dato) {
        await data.updateOne({
          $pull: { trabajos: { numero: dato.numero } }
        });
        message.channel.send(rmv);
      } else if (!dato) {
        const no_cantidad = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolmeh:811088359212449792> La ID proporcionada no es válida"
          )
          .setColor("RED")
          .setTimestamp();

        return message.channel.send(no_cantidad);
      }
    }
    if (args[0].toLowerCase() == "crimen") {
      const content = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Proporciona una ID de una réplica de crimen"
        )
        .addField("Ejemplo", `\`${prefix}remove-replica <crimen> <ID>\``)
        .setColor("RED")
        .setTimestamp();
      if (!args[1]) return message.channel.send(content);

      let dato = data.crimenes_buenos.find(x => x.numero == parseInt(args[1]));

      const rmv = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<a:coool:811088296762409022> Se ha removido la réplica de ID " +
            args[1]
        )
        .setColor("GREEN")
        .setFooter(
          "Para remover una réplica de falla, usa " + prefix + "remove-fail"
        );

      if (dato) {
        await data.updateOne({
          $pull: { crimenes_buenos: { numero: dato.numero } }
        });
        message.channel.send(rmv);
      } else if (!dato) {
        const no_cantidad = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolmeh:811088359212449792> La ID proporcionada no es válida"
          )
          .setColor("RED")
          .setTimestamp();

        return message.channel.send(no_cantidad);
      }
    }
    if (args[0].toLowerCase() == "crimen") {
      const content = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Proporciona una ID de una réplica de crimen"
        )
        .addField("Ejemplo", `\`${prefix}remove-replica <crimen> <ID>\``)
        .setColor("RED")
        .setTimestamp();
      if (!args[1]) return message.channel.send(content);

      let dato = data.pirateria_buenos.find(x => x.numero == parseInt(args[1]));

      const rmv = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<a:coool:811088296762409022> Se ha removido la réplica de ID " +
            args[1]
        )
        .setColor("GREEN")
        .setFooter(
          "Para remover una réplica de falla, usa " + prefix + "remove-fail"
        );
      if (dato) {
        await data.updateOne({
          $pull: { pirateria_buenos: { numero: dato.numero } }
        });
        message.channel.send(rmv);
      } else if (!dato) {
        const no_cantidad = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            "<:coolmeh:811088359212449792> La ID proporcionada no es válida"
          )
          .setColor("RED")
          .setTimestamp();

        return message.channel.send(no_cantidad);
      }
    }
  }
};
