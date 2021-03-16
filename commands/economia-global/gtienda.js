const Discord = require("discord.js");
const g_economy = require("../../database/models/economy-global.js");
const shop = require("../../shopItems.js")
const hd = require("humanize-duration")

module.exports = {
  name: "g-tienda",
  description: "Gana dinero en la economia global",
  cooldown: 5,
  aliases: ["g-shop", "gtienda", "gshop"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    
    const e_t = new Discord.MessageEmbed()
    .setColor("GREEN")
    
    const objects = shop.map(x => e_t.addField(x.item, `\`Precio:\` ${x.price.toLocaleString()}\n\`Descripcion:\` ${x.description}\n\`Tiempo:\` ${x.tiempo ? hd(x.tiempo, {language: "es"}) : "ninguno"}\n\`Ganancia:\` ${x.ganancia ? x.ganancia.toLocaleString() : "ninguna"}\n\`Limite:\` ${x.limite}\n\`Tipo:\` ${x.tipo}`, true))
    
    message.channel.send(e_t)
  }
}
    