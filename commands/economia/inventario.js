const Discord = require("discord.js");
const inventory = require("../../database/models/inventory");
const items = require("../../shopItems");

module.exports = {
  name: "inventario",
  description: "Mira tu inventario",
  cooldown: 5,
  aliases: ["inv"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    inventory.findOne(
      { Guild: message.guild.id, User: message.author.id },
      async (err, data) => {
        const nada = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription("<:coolsob:811088449024294922> Tu inventario esta vacio")
          .setColor("RED")
          .setTimestamp();
        if (!data) return message.channel.send(nada);

        const mappedData = Object.keys(data.Inventory)
          .map(key => {
            return `${key} x${data.Inventory[key]}`;
          })
          .join("\n");

        const inv = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(mappedData)
          .setColor("BLUE")
          .setTimestamp();
        message.channel.send(inv);
      }
    );
  }
};
