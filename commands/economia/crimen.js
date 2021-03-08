const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const hd = require("humanize-duration");
const db = require("quick.db");

module.exports = {
  name: "crimen",
  description: "Puedes perder o ganar dinero",
  cooldown: 5,
  aliases: ["crime"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await economy.findOne({
      GuildID: message.guild.id
    });
    if (!data) data = await economy.create({ GuildID: message.guild.id });

    let symbol = data.currency;
    let min = data.minMoneyCrime;
    let max = data.maxMoneyCrime;
    let probabilidad = data.crimen_probabilidad;
    let crimenes_si = data.crimenes_buenos.map(x => x.replica);
    let crimenes_no = data.crimenes_malos.map(x => x.replica);
    let tiempo = data.TimeCrime;

    const no_hay = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolsob:811088449024294922> No hay replicas de crímenes suficientes para usar el comando"
      )
      .setColor("RED")
      .setFooter(
        "Añade replicas de fallas con " +
          prefix +
          "add-fail o normales con " +
          prefix +
          "add-replica"
      );
    if (crimenes_si.length == 0 || crimenes_no.length == 0)
      return message.channel.send(no_hay);

    let ganancias = Math.floor(Math.random() * (max - min + 1) + max);
    let aleatorio = Math.round(Math.random() * 100);
    let crimen_si = crimenes_si[Math.floor(Math.random() * crimenes_si.length)];
    let crimen_no = crimenes_no[Math.floor(Math.random() * crimenes_no.length)];

    let crimen_id = data.crimenes_buenos.find(x => x.replica == crimen_si)
      .numero;
    let crimen_ID = data.crimenes_malos.find(x => x.replica == crimen_no)
      .numero;

    let usuario = db.fetch(
      `TimerCrime_${message.guild.id}.${message.author.id}`
    );

    if (Date.now() < usuario) {
      let restante = usuario - Date.now();
      let tiempo_restante = hd(restante, { language: "es" });

      const falta_tiempo = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolduerme:811087907891970089> Debes esperar " +
            tiempo_restante +
            " para volver a cometer un crimen"
        )
        .setColor("RED")
        .setTimestamp();
      return message.channel.send(falta_tiempo);
    }

    const bal = await client.bal(message.guild.id, message.author.id);

    const no_max = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> Debes tener mínimo "+symbol+"500 para cometer un crimen"
      )
      .setColor("RED")
      .setTimestamp();
    if (500 > bal) return message.channel.send(no_max);

    if (aleatorio <= probabilidad) {
      client.add(message.guild.id, message.author.id, ganancias);

      const bien = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(crimen_si.replace("[plata]", `${symbol}${ganancias}`))
        .setColor("GREEN")
        .setFooter(`Replica #${crimen_id}`);
      message.channel.send(bien);
    } else {
      client.rmv(message.guild.id, message.author.id, ganancias);

      const mal = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(crimen_no.replace("[plata]", `${symbol}${ganancias}`))
        .setColor("RED")
        .setFooter(`Replica #${crimen_ID}`);
      message.channel.send(mal);
    }
    db.delete(`TimerCrime_${message.guild.id}.${message.author.id}`);
    db.add(
      `TimerCrime_${message.guild.id}.${message.author.id}`,
      Date.now() + tiempo
    );
  }
};
