const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");

module.exports = {
  name: "add-replica",
  description: "Añade replicas cuando los usuarios ganen dinero",
  cooldown: 5,
  aliases: ["add replica", "addreplica", "addrepply"],
  args: true,
  usage: "<trabajo | crimen | pirata> <replica>",
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
        "<:coolmeh:811088359212449792> Agrega replicas de trabajo, de crimenes o pirateria, junto con sus respuestas"
      )
      .addField(
        "Ejemplo",
        `\`${prefix}add-replica <trabajo | crimen | pirata> <contenido>\``
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
          "<:coolmeh:811088359212449792> Agrega un contenido a la replica"
        )
        .addField("Ejemplo", `\`${prefix}add-replica <trabajo> <contenido>\``)
        .setColor("RED")
        .setTimestamp();
      if (!args[1]) return message.channel.send(content);

      const no_cantidad = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Agrega en algun lugar de tu replica [plata], para asi hacerle saber al usuario cuanto gano"
        )
        .addField(
          "Ejemplo",
          `\`${prefix}add-replica <trabajo> <Trabajaste y conseguiste [plata]>\``
        )
        .setColor("RED")
        .setTimestamp();
      if (
        !args
          .slice(1)
          .join(" ")
          .includes("[plata]")
      )
        return message.channel.send(no_cantidad);

      const add = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolsmile:811088100909645866> Se ha añadido la replica al trabajar"
        )
        .setColor("GREEN")
        .setTimestamp();

      if (data) {
        data.trabajos.unshift({
          replica: args.slice(1).join(" "),
          numero: Math.floor(Math.random() * 100000)
        });
        data.save();
        message.channel.send(add);
      } else if (!data) {
        let newData = new economy({
          GuildID: message.guild.id,
          trabajos: [
            {
              replica: args.slice(1).join(" "),
              numero: Math.floor(Math.random() * 100000)
            }
          ]
        });
        newData.save();
        message.channel.send(add);
      }
    }
    if (args[0].toLowerCase() == "crimen") {
      const content = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Agrega un contenido a la replica"
        )
        .addField("Ejemplo", `\`${prefix}add-replica <crimen> <contenido>\``)
        .setColor("RED")
        .setTimestamp();
      if (!args[1]) return message.channel.send(content);

      const no_cantidad = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Agrega en algun lugar de tu replica [plata], para asi hacerle saber al usuario cuanto gano"
        )
        .addField(
          "Ejemplo",
          `\`${prefix}add-replica <crimen> <Hiciste un crimen y conseguiste [plata]>\``
        )
        .setColor("RED")
        .setTimestamp();
      if (
        !args
          .slice(1)
          .join(" ")
          .includes("[plata]")
      )
        return message.channel.send(no_cantidad);

      const add = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolsmile:811088100909645866> Se ha añadido la replica al ganar un crimen"
        )
        .setColor("GREEN")
        .setFooter(
          "Puedes agregar una réplica al fallar con " + prefix + "add-fail"
        );

      if (data) {
        data.crimenes_buenos.unshift({
          replica: args.slice(1).join(" "),
          numero: Math.floor(Math.random() * 100000)
        });
        data.save();
        message.channel.send(add);
      } else if (!data) {
        let newData = new economy({
          GuildID: message.guild.id,
          crimenes_buenos: [
            {
              replica: args.slice(1).join(" "),
              numero: Math.floor(Math.random() * 100000)
            }
          ]
        });
        newData.save();
        message.channel.send(add);
      }
    }
    if (args[0].toLowerCase() == "pirata") {
      const content = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Agrega un contenido a la replica"
        )
        .addField("Ejemplo", `\`${prefix}add-replica <pirata> <contenido>\``)
        .setColor("RED")
        .setTimestamp();
      if (!args[1]) return message.channel.send(content);

      const no_cantidad = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Agrega en algun lugar de tu replica [plata], para asi hacerle saber al usuario cuanto gano"
        )
        .addField(
          "Ejemplo",
          `\`${prefix}add-replica <pirata> <Cometiste pirateria y conseguiste [plata]>\``
        )
        .setColor("RED")
        .setTimestamp();
      if (
        !args
          .slice(1)
          .join(" ")
          .includes("[plata]")
      )
        return message.channel.send(no_cantidad);

      const add = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolsmile:811088100909645866> Se ha añadido la replica al ganar en pirateria"
        )
        .setColor("GREEN")
        .setFooter(
          "Puedes agregar una réplica al fallar con " + prefix + "add-fail"
        );

      if (data) {
        data.pirateria_buenos.unshift({
          replica: args.slice(1).join(" "),
          numero: Math.floor(Math.random() * 100000)
        });
        data.save();
        message.channel.send(add);
      } else if (!data) {
        let newData = new economy({
          GuildID: message.guild.id,
          pirateria_buenos: [
            {
              replica: args.slice(1).join(" "),
              numero: Math.floor(Math.random() * 100000)
            }
          ]
        });
        newData.save();
        message.channel.send(add);
      }
    }
  }
};
