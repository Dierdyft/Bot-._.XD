const Discord = require("discord.js");
const g_economy = require("../../database/models/economy-global.js");
const db = require("quick.db");
const hd = require("humanize-duration");

module.exports = {
  name: "producir-oro",
  description: "Produce oro de tus generadores",
  cooldown: 10,
  aliases: ["pro-oro", "p-oro"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await g_economy.findOne({
      userID: message.author.id
    });

    if (!data) data = await g_economy.create({ userID: message.author.id });

    const sin_gen = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> No tienes generadores de oro"
      )
      .setColor("RED")
      .setTimestamp();
    if (data.gen_oro.length < 1) return message.channel.send(sin_gen);

    const sin_alm = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Debes comprar un almacen de oro para guardar tu oro"
      )
      .setColor("RED")
      .setTimestamp();
    if (data.alm_oro.length < 1) return message.channel.send(sin_alm);

    let lleva_map = data.gen_oro.map(x => x.llevo);
    let lleva_red = lleva_map.reduce((a, b) => a + b, 0);

    let limite_map = data.gen_oro.map(x => x.limite);
    let limite_red = limite_map.reduce((a, b) => a + b, 0);

    let tiempo_map = data.gen_oro.map(x => x.tiempo);
    let tiempo_red = tiempo_map.reduce((a, b) => a + b, 0);

    let ganancia_map = data.gen_oro.map(x => x.ganancia);
    let ganancia_red = ganancia_map.reduce((a, b) => a + b, 0);

    const produciendo = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("GREEN")
      .setTimestamp()
      .setDescription(
        "<a:loadingmad:807848256264077313> Empezando produccion de oro"
      );

    let msg = await message.channel.send(produciendo);

    setInterval(async () => {
      if (lleva_red >= limite_red) return;
      lleva_red += ganancia_red;
      await data.updateOne({
        userID: message.author.id,
        $inc: { pro_oro: ganancia_red }
      });

      console.log(
        `Ya hay oro\nLlevo: ${lleva_red}\nLimite: ${limite_red}\nGanancia: ${ganancia_red}\nTiempo: ${tiempo_red}`
      );

      if (lleva_red >= limite_red) {
        produciendo.setDescription("<:coolhappy:816349108939128882> Se produjeron " + lleva_red + " de oro");
        return msg.edit(produciendo);
      }
      produciendo.setDescription(
        "<a:loadingmad:807848256264077313> Se han producido " +
          lleva_red +
          " de oro"
      );
      msg.edit(produciendo);
    }, tiempo_red);
  }
};
