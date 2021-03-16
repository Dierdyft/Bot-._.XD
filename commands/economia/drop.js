const Discord = require("discord.js");

module.exports = {
  name: "drop",
  description: "Lanza un drop a un chat para que los usuarios consigan dinero",
  cooldown: 10,
  aliases: [],
  args: true,
  usage: "<canal> <dinero>",
  execute: async (client, message, args, prefix) => {
    
    const permiso = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Ya quisieras, tienes que tener el permiso __ADMINISTRADOR__"
      )
      .setColor("RED")
      .setTimestamp();
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(permiso);

    const canal = message.mentions.channels.first();

    const que_canal = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> Proporciona el canal donde se dará el dinero"
      )
      .setColor("RED")
      .setTimestamp();
    if (!canal) return message.channel.send(que_canal);

    const canalserver = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> El drop debe ser en un canal de este servidor"
      )
      .setColor("RED")
      .setTimestamp();
    if (!message.guild.channels.cache.get(canal.id))
      return message.channel.send(canalserver);

    const que_regalas = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> Proporciona la cantidad de dinero que vas a dar"
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[1] || isNaN(args[1])) return message.channel.send(que_regalas);

    const filter = msg =>
      msg.guild.id === message.guild.id &&
      msg.content.toLowerCase() == `${prefix}reclamar`;

    const dropper = new Discord.MessageEmbed()
      .setAuthor(
        client.user.tag,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<a:coool:811088296762409022> Ha caído un drop aleatorio a este canal, usa " +
          prefix +
          "reclamar para conseguirlo"
      )
      .setColor("GREEN")
      .setTimestamp();
    canal.send(dropper);

    canal.awaitMessages(filter, { max: 1, time: 60000 }).then(async msg => {
      const id = msg.first().author.id;
      const coinsToClaim = parseInt(args[1]);

      client.add(message.guild.id, id, coinsToClaim);

      const ganas = new Discord.MessageEmbed()
        .setAuthor(
          msg.first().author.tag,
          msg.first().author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<a:coool:811088296762409022> Haz conseguido el drop con una recompensa de " +
            args[1].toLocaleString() +
            " de dinero"
        )
        .setColor("GREEN")
        .setTimestamp();
      msg.first().channel.send(ganas);
    });
  }
};

