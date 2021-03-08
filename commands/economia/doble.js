const Discord = require("discord.js");

module.exports = {
  name: "doble-o-nada",
  description: "Apuesta doble o nada",
  cooldown: 10,
  aliases: ["don", "doble"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    
    const que_apuestas = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> Proporciona la cantidad de dinero que vas a apostar"
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0] || isNaN(args[0])) return message.channel.send(que_apuestas);

    const bal = await client.bal(message.guild.id, message.author.id);

    const amountToBet = parseInt(args[0]);

    const no_max = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> No tienes esa cantidad de dinero para apostar"
      )
      .setColor("RED")
      .setTimestamp();
    if (amountToBet > bal) return message.channel.send(no_max);

    function random() {
      const num = Math.floor(Math.random() * 2);
      return num === 1;
    }

    if (random() === true) {
      const winAmount = amountToBet * 2;

      client.add(message.guild.id, message.author.id, winAmount);

      const ganas = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<a:coool:811088296762409022> Haz ganando " +
            winAmount.toLocaleString() +
            " de dinero, genial"
        )
        .setColor("GREEN")
        .setTimestamp();
      message.channel.send(ganas);
    } else {
      client.rmv(message.guild.id, message.author.id, amountToBet);

      const pierdes = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolmeh:811088359212449792> Haz perdido " +
            amountToBet.toLocaleString() +
            " de dinero, mejor suerte a la próxima"
        )
        .setColor("RED")
        .setTimestamp();
      message.channel.send(pierdes);
    }
  }
};
