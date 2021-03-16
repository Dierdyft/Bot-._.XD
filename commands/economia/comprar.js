const Discord = require("discord.js");
const inventory = require("../../database/models/inventory");
const shopItems = require("../../database/models/shopItems.js");

module.exports = {
  name: "comprar",
  description: "Compra algo de la tienda",
  cooldown: 5,
  aliases: ["buy"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    const argumento = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription("<:coolsob:811088449024294922> Proporciona el objeto que quieres comprar")
      .setColor("RED")
      .setTimestamp();
    if (!args[0]) return message.channel.send(argumento);

    const itemToBuy = args.join(" ").toLowerCase();

    let data_a = await shopItems.findOne({Guild: message.guild.id}) 
    
    let dato = data_a.Items.find(x => x.nombre.toLowerCase() == itemToBuy);


    const noEsta = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolsob:811088449024294922> El objeto que quieres comprar no se encuentra en la tienda"
      )
      .setColor("RED")
      .setTimestamp();
    if (!dato) return message.channel.send(noEsta);

    const itemPrice = data_a.Items.find(val => val.nombre.toLowerCase() == itemToBuy)
      .precio;

    const userBalance = await client.bal(message.guild.id, message.author.id);

    const caro = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolsob:811088449024294922> Tu balance es de " +
          userBalance.toLocaleString() +
          " y el objeto cuesta " +
          itemPrice.toLocaleString() +
          ", no te alcanza"
      )
      .setColor("RED")
      .setTimestamp();
    if (userBalance < itemPrice) return message.channel.send(caro);

    const params = { Guild: message.guild.id, User: message.author.id };
    inventory.findOne(params, async (err, data) => {
      if (data) {
        const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
        if (!hasItem) {
          data.Inventory[itemToBuy] = 1;
        } else {
          data.Inventory[itemToBuy]++;
        }
        await inventory.findOneAndUpdate(params, data);
      } else {
        new inventory({
          Guild: message.guild.id,
          User: message.author.id,
          Inventory: { [itemToBuy]: 1 }
        }).save();
      }

      const compra = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription("Haz comprado un " + itemToBuy)
        .setColor("GREEN")
        .setTimestamp();
      message.channel.send(compra);
      client.rmv(message.guild.id, message.author.id, itemPrice);
    });
  }
};
