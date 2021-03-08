const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");

module.exports = {
  name: "add-fail",
  description: "Añade replicas cuando los usuarios pierdan dinero",
  cooldown: 5,
  aliases: ["add fail", "addfail"],
  args: true,
  usage: "<crimen | pirata> <replica>",
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
        `\`${prefix}add-fail <crimen | pirata> <contenido>\``
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0] || !["crimen", "pirata"].includes(args[0].toLowerCase()))
      return message.channel.send(opciones);

    if (args[0].toLowerCase() == "crimen") {
      const content = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Agrega un contenido a la replica"
        )
        .addField("Ejemplo", `\`${prefix}add-fail <crimen> <contenido>\``)
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
          `\`${prefix}add-fail <crimen> <Hiciste este crimen y perdiste [plata]>\``
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
          "<:coolsmile:811088100909645866> Se ha añadido la replica al fallar en un crimen"
        )
        .setColor("GREEN")
        .setFooter(
          "Puedes agregar una réplica al ganar con " + prefix + "add-reply"
        );

      if (data) {
        data.crimenes_malos.unshift({
          replica: args.slice(1).join(" "), 
          numero: Math.floor(Math.random() * 100000)
        });
        data.save()
        message.channel.send(add);
      } else if(!data) {
        let newData = new economy({
          GuildID: message.guild.id,
          crimenes_malos: [{
           replica: args.slice(1).join(" "), 
           numero: Math.floor(Math.random() * 100000)
          }, ]
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
        .addField("Ejemplo", `\`${prefix}add-fail <pirata> <contenido>\``)
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
          `\`${prefix}add-fail <pirata> <Hiciste pirateria y perdiste [plata]>\``
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
          "<:coolsmile:811088100909645866> Se ha añadido la replica al fallar en un pirateria"
        )
        .setColor("GREEN")
        .setFooter(
          "Puedes agregar una réplica al ganar con " + prefix + "add-reply"
        );

      if (data) {
        data.pirateria_malos.unshift({
          replica: args.slice(1).join(" "), 
          numero: Math.floor(Math.random() * 100000)
        });
        data.save()
        message.channel.send(add);
      } else if(!data) {
        let newData = new economy({
          GuildID: message.guild.id,
          pirateria_malos: [{
           replica: args.slice(1).join(" "), 
           numero: Math.floor(Math.random() * 100000)
          }, ]
        });
        newData.save();
        message.channel.send(add);
      }
    
    }
  }
};
