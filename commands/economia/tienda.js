const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const items = require("../../shopItems");
const shopItems = require("../../database/models/shopItems.js")

module.exports = {
  name: "tienda",
  description: "Mira los objetos de la tienda",
  cooldown: 5,
  aliases: ["shop"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await economy.findOne({
      GuildID: message.guild.id
    });
    let data_a = await shopItems.findOne({
      Guild: message.guild.id
    });
    if (!data) data = await economy.create({ GuildID: message.guild.id });

    const no_hay_objetos = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription("<:coolsob:811088449024294922> No hay objetos creados en este servidor")
      .setColor("RED")
      .setTimestamp();
    if (!data_a || data_a.Items.length == 0) return message.channel.send(no_hay_objetos);

    const listado = new Discord.MessageEmbed();

    const shopList = data_a.Items.map(value => {
      listado.addField(
        `${data.currency}${value.precio.toLocaleString()} - ${value.nombre}`,
        `${value.descripcion}`
      );
    });

    listado.setAuthor(
      "Tienda de objetos en " + message.guild.name,
      message.guild.iconURL({ dynamic: true })
    );
    shopList;
    listado.setColor("BLUE");
    message.channel.send(listado);
  }
};
