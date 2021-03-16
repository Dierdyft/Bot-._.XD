const Discord = require("discord.js");
const g_economy = require("../../database/models/economy-global.js");
const db = require("quick.db");
const hd = require("humanize-duration");

module.exports = {
  name: "g-estado",
  description: "Mira tu estado en la economia global",
  cooldown: 5,
  aliases: ["g-est", "gestado", "gest"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    const mencion =
      message.mentions.members.first() ||
      message.guild.members.resolve(args[0]);

    if (mencion) {
      let data = await g_economy.findOne({
        userID: mencion.id
      });
      if (!data) data = await g_economy.create({ userID: mencion.id });

      let oro_map = data.alm_oro.map(x => x.lleva);
      let oro_red = oro_map.reduce((a, b) => a + b, 0);

      let elixir_map = data.alm_elixir.map(x => x.lleva);
      let elixir_red = elixir_map.reduce((a, b) => a + b, 0);

      let d_elixir_map = data.alm_dark_elixir.map(x => x.lleva);
      let d_elixir_red = d_elixir_map.reduce((a, b) => a + b, 0);

      let oro_per = data.alm_oro.map(x => x.limite);
      let oro_por = (oro_red / oro_per.reduce((a, b) => a + b, 0)) * 100;

      let eli_per = data.alm_elixir.map(x => x.limite);
      let eli_por = (elixir_red / eli_per.reduce((a, b) => a + b, 0)) * 100;

      let eli_d_per = data.alm_dark_elixir.map(x => x.limite);
      let eli_d_por =
        (d_elixir_red / eli_d_per.reduce((a, b) => a + b, 0)) * 100;
      let tu_bal = new Discord.MessageEmbed()
        .setAuthor(
          "Estado de " + mencion.user.tag,
          mencion.user.displayAvatarURL({ dynamic: true })
        )
        .addField("Oro en generadores:", "<:oro:821058189540851752>" + data.pro_oro.toLocaleString(), true)
        .addField(
          "Elixir en generadores:", "<:redstone:821058711174905917>" +
          data.pro_elixir.toLocaleString(),
          true
        )
        .addField(
          "Elixir oscuro en generadores:", "<:polvora:821058493624090646>" +
          data.pro_dark_elixir.toLocaleString(),
          true
        )
        .addField(
          "Oro en almacenes:", 
          `<:oro:821058189540851752>${oro_red.toLocaleString()} \`(%${Math.round(oro_por)})\``,
          true
        )
        .addField(
          "Elixir en almacenes:", "<:redstone:821058711174905917>" +
          `${elixir_red.toLocaleString()} \`(%${Math.round(eli_por)})\``,
          true
        )
        .addField(
          "Elixir oscuro en almacenes:", "<:polvora:821058493624090646>" +
          `${d_elixir_red.toLocaleString()} \`(%${Math.round(eli_d_por) ||
            0})\``,
          true
        )
        .addField("Gemas:", "<:esmeralda:821059139987177552>" + data.gemas.toLocaleString(), true)
        .setColor("BLUE");
      return message.channel.send(tu_bal);
    } else {
      let datA = await g_economy.findOne({
        userID: message.author.id
      });
      if (!datA) datA = await g_economy.create({ userID: message.author.id });

      let oro_map = datA.alm_oro.map(x => x.lleva);
      let oro_red = oro_map.reduce((a, b) => a + b, 0);

      let elixir_map = datA.alm_elixir.map(x => x.lleva);
      let elixir_red = elixir_map.reduce((a, b) => a + b, 0);

      let d_elixir_map = datA.alm_dark_elixir.map(x => x.lleva);
      let d_elixir_red = d_elixir_map.reduce((a, b) => a + b, 0);

      let oro_per = datA.alm_oro.map(x => x.limite);
      let oro_por = (oro_red / oro_per.reduce((a, b) => a + b, 0)) * 100;

      let eli_per = datA.alm_elixir.map(x => x.limite);
      let eli_por = (elixir_red / eli_per.reduce((a, b) => a + b, 0)) * 100;

      let eli_d_per = datA.alm_dark_elixir.map(x => x.limite);
      let eli_d_por =
        (d_elixir_red / eli_d_per.reduce((a, b) => a + b, 0)) * 100;

      let mi_bal = new Discord.MessageEmbed()
        .setAuthor(
          "Tu estado " + message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addField("Oro en generadores:", "<:oro:821058189540851752>" + datA.pro_oro.toLocaleString(), true)
        .addField(
          "Elixir en generadores:", "<:redstone:821058711174905917>" +
          datA.pro_elixir.toLocaleString(),
          true
        )
        .addField(
          "Elixir oscuro en generadores:", "<:polvora:821058493624090646>" +
          datA.pro_dark_elixir.toLocaleString(),
          true
        )
        .addField(
          "Oro en almacenes:", 
          `<:oro:821058189540851752>${oro_red.toLocaleString()} \`(%${Math.round(oro_por)})\``,
          true
        )
        .addField(
          "Elixir en almacenes:",
          `<:redstone:821058711174905917>${elixir_red.toLocaleString()} \`(%${Math.round(eli_por)})\``,
          true
        )
        .addField(
          "Elixir oscuro en almacenes:",
          `<:polvora:821058493624090646>${d_elixir_red.toLocaleString()} \`(%${Math.round(eli_d_por) ||
            0})\``,
          true
        )
        .addField("Gemas:", "<:esmeralda:821059139987177552>" + datA.gemas.toLocaleString(), true)
        .setColor("BLUE");
      return message.channel.send(mi_bal);
    }
  }
};
