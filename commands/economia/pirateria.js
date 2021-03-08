const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const db = require("quick.db");
const hd = require("humanize-duration");

module.exports = {
  name: "pirateria",
  description: "Puedes perder o ganar dinero",
  cooldown: 5,
  aliases: ["pirata"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await economy.findOne({
      GuildID: message.guild.id
    });

    if (!data) data = await economy.create({ GuildID: message.guild.id });

    let symbol = data.currency;
    let min = data.minMoneyPirateria;
    let max = data.maxMoneyPirateria;
    let probabilidad = data.pirateria_probabilidad;
    let tiempo = data.TimePirateria;
    let piratas_bien = data.pirateria_buenos.map(x => x.replica)
    let piratas_mal = data.pirateria_malos.map(x => x.replica)

    const no_hay = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolsob:811088449024294922> No hay replicas de pirateria suficientes para usar el comando"
      )
      .setColor("RED")
      .setFooter(
        "Añade replicas de fallas con " +
          prefix +
          "add-fail o normales con " +
          prefix +
          "add-replica"
      );
    if (piratas_mal.length == 0 || piratas_bien.length == 0)
      return message.channel.send(no_hay);

    let usuario = db.fetch(
      `TimerPirata_${message.guild.id}.${message.author.id}`
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
            " para volver a piratear"
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
        "<:coolmeh:811088359212449792> Debes tener mínimo "+symbol+"500 para cometer pirateria"
      )
      .setColor("RED")
      .setTimestamp();
    if (500 > bal) return message.channel.send(no_max);

    let ganancias = Math.floor(Math.random() * (max - min + 1) + max);
    let aleatorio = Math.round(Math.random() * 100);
    let pirata_si = piratas_bien[Math.floor(Math.random() * piratas_bien.length)];
    let pirata_no = piratas_mal[Math.floor(Math.random() * piratas_mal.length)];

    let bien_id = data.pirateria_buenos.find(x => x.replica == pirata_si).numero
    let mal_id = data.pirateria_malos.find(x => x.replica == pirata_no).numero

    if (aleatorio <= probabilidad) {
      client.add(message.guild.id, message.author.id, ganancias);

      const bien = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(pirata_si.replace("[plata]", `${symbol}${ganancias}`))
        .setColor("GREEN")
        .setFooter(`Replica #${bien_id}`)
      message.channel.send(bien);
    } else {
      client.rmv(message.guild.id, message.author.id, ganancias);

      const mal = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(pirata_no.replace("[plata]", `${symbol}${ganancias}`))
        .setColor("RED")
        .setFooter(`Replica #${mal_id}`)
      message.channel.send(mal);
    }

    db.delete(`TimerPirata_${message.guild.id}.${message.author.id}`);
    db.add(
      `TimerPirata_${message.guild.id}.${message.author.id}`,
      Date.now() + tiempo
    );
  }
};
