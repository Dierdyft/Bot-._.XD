const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const db = require("quick.db");
const hd = require("humanize-duration");

module.exports = {
  name: "trabajar",
  description: "Consigue dinero",
  cooldown: 5,
  aliases: ["work"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await economy.findOne({
      GuildID: message.guild.id
    });
    if (!data) data = await economy.create({ GuildID: message.guild.id });

    let symbol = data.currency;
    let money_max = data.maxMoneyWork;
    let money_min = data.minMoneyWork;
    let tiempo = data.TimeWork;
    let trabajos_db = data.trabajos.map(x => x.replica)

    const no_hay = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolsob:811088449024294922> No hay replicas de trabajo suficientes para usar el comando"
      )
      .setColor("RED")
      .setFooter(
        "Añade replicas de con " +
          prefix +"add-replica" 
          
      );
    if (trabajos_db.length == 0)
      return message.channel.send(no_hay);

    let usuario = db.fetch(`TimerWork_${message.guild.id}.${message.author.id}`);

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
            " para volver a trabajar"
        )
        .setColor("RED")
        .setTimestamp();
      return message.channel.send(falta_tiempo);
    }
    
    let ganancias = Math.floor(
      Math.random() * (money_max - money_min + 1) + money_max
    );

    const trabajo = trabajos_db[Math.floor(Math.random() * trabajos_db.length)];
    let trabajo_id = data.trabajos.find(x => x.replica == trabajo).numero

    client.add(message.guild.id, message.author.id, ganancias);

    const trabajaste = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(trabajo.replace("[plata]", `${symbol}${ganancias}`))
      .setColor("GREEN")
      .setFooter(`Replica #${trabajo_id}`)
    message.channel.send(trabajaste);
    
    db.delete(`TimerWork_${message.guild.id}.${message.author.id}`) 
  db.add(`TimerWork_${message.guild.id}.${message.author.id}`, Date.now() + tiempo)
  }
};
