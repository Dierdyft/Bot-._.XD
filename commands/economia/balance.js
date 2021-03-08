const Discord = require("discord.js");

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

    if (mencion) {
      let bal = await client.bal(message.guild.id, mencion.id);
      let user_bank = await client.balb(message.guild.id, mencion.id);

      let tu_bal = new Discord.MessageEmbed()
        .setAuthor(
          "Balance de " + mencion.user.tag,
          mencion.user.displayAvatarURL({ dynamic: true })
        )
        .addField("😎 Dinero en mano", bal.toLocaleString())
        .addField("🏛️ En banco", user_bank.toLocaleString())
        .addField("🤑 Total", (bal + user_bank).toLocaleString())
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
        .addField("😎 Dinero en mano", bale.toLocaleString())
        .addField("🏛️ En banco", data_a.toLocaleString())
        .addField("🤑 Total", (bale + data_a).toLocaleString())
        .setColor("BLUE");
      message.channel.send(mi_bal);
    }
  }
};
