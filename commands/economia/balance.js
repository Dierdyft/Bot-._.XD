const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");

module.exports = {
  name: "balance",
  description: "Miras tu balance",
  cooldown: 5,
  aliases: ["bal"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    const mencion =
      message.mentions.members.first() ||
      message.guild.members.resolve(args[0]);

    let data = await economy.findOne({
      GuildID: message.guild.id
    });
    if (!data) data = await economy.create({ GuildID: message.guild.id });

    let sim = data.currency;
    
    if (mencion) {
      let bal = await client.bal(message.guild.id, mencion.id);
      let user_bank = await client.balb(message.guild.id, mencion.id);

      let tu_bal = new Discord.MessageEmbed()
        .setAuthor(
          "Balance de " + mencion.user.tag,
          mencion.user.displayAvatarURL({ dynamic: true })
        )
        .addField("Dinero en mano", sim + bal.toLocaleString())
        .addField("En banco", sim + user_bank.toLocaleString())
        .addField("Total", `${sim}${(bal + user_bank).toLocaleString()}`)
        .setColor("BLUE");
      message.channel.send(tu_bal);
    } else {
      let bale = await client.bal(message.guild.id, message.author.id);
      let data_a = await client.balb(message.guild.id, message.author.id);

      let mi_bal = new Discord.MessageEmbed()
        .setAuthor(
          "Tu balance " + message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addField("Dinero en mano", sim + bale.toLocaleString())
        .addField("En banco", sim + data_a.toLocaleString())
        .addField("Total", `${sim}${(bale + data_a).toLocaleString()}`)
        .setColor("BLUE");
      message.channel.send(mi_bal);
    }
  }
};
