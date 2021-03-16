const Discord = require("discord.js");
const g_economy = require("../../database/models/economy-global.js");
const db = require("quick.db");
const hd = require("humanize-duration");

module.exports = {
  name: "recolectar-oro",
  description: "Recolecta oro de tus generadores",
  cooldown: 10,
  aliases: ["rec-oro", "r-oro"],
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
        "<:coolduerme:811087907891970089> No tienes almacenes de oro"
      )
      .setColor("RED")
      .setTimestamp();
    if (data.alm_oro.length < 1) return message.channel.send(sin_gen);

    const sin_oro = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> No tienes oro para recolectar"
      )
      .setColor("RED")
      .setTimestamp();
    if (data.pro_oro < 1) return message.channel.send(sin_oro);

    const falta_id = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Especifica la ID de un almacenador"
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0]) return message.channel.send(falta_id);

    let busca_id = data.alm_oro.find(x => x.id == parseInt(args[0]));

    if (busca_id) {
      
      let dep;       
     if (busca_id.limite < (data.pro_oro + busca_id.lleva)) {
        dep = (data.pro_oro + busca_id.lleva) - busca_id.limite 
      } else {
        dep = data.pro_oro
      }
      
      await data.updateOne({
        alm_oro: {
          id: parseInt(args[0]),
          limite: busca_id.limite,
          lleva: busca_id.lleva + dep,
          nivel: busca_id.nivel
        }
      });
      await data.updateOne({
        userID: message.author.id,
        $inc: { pro_oro: - dep }
      });
      const si_existe = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolduerme:811087907891970089> Se han sumado " +
            dep +
            " de oro al almacen " + args[0]
        )
        .setColor("GREEN")
        .setTimestamp();

      message.channel.send(si_existe);
    } else if (!busca_id) {
      const idinvalida = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolduerme:811087907891970089> La ID proporcionada es invalida")
        .setColor("RED")
        .setTimestamp();
      return message.channel.send(idinvalida);
    }
  }
};
