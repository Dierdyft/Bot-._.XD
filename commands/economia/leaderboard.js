const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");

module.exports = {
  name: "leaderboard",
  description: "Obtén las estadísticas de economía",
  cooldown: 5,
  aliases: ["lb", "top"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let dataE = await economy.findOne({
      GuildID: message.guild.id
    });
    if (!dataE) dataE = await economy.create({ GuildID: message.guild.id });

    let symbol = dataE.currency;

    if (args[0] == "-dinero") {
      const collection_d = new Discord.Collection();

      await Promise.all(
        message.guild.members.cache.map(async member => {
          const id = member.id;
          const bal_d = await client.bal(message.guild.id, id);

          console.log(`${member.user.tag} -> ${bal_d}`);

          return bal_d !== 0
            ? collection_d.set(id, {
                id,
                bal_d
              })
            : null;
        })
      );
      const data_d = collection_d.sort((a, b) => b.bal - a.bal).first(10);

      const nadie = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolduerme:811087907891970089> No hay ningún usuario con dinero en este servidor"
        )
        .setColor("RED")
        .setTimestamp();
      if (!data_d || data_d.length == 0) return message.channel.send(nadie);

      const tabla = new Discord.MessageEmbed()
        .setAuthor(
          `Tabla de posiciones en ${message.guild.name}`,
          message.guild.iconURL({ dynamic: true })
        )
        .setDescription(
          data_d
            .map((v, i) => {
              return `**${i + 1}.** [${
                client.users.cache.get(v.id).tag
              }](https://discord.gg/HV42DkNvvw) • ${symbol}${v.bal_d.toLocaleString()}`;
            })
            .join("\n")
        )
        .setColor("BLUE");
      return message.channel.send(tabla);
    }
    if (args[0] == "-banco") {
      const collection_b = new Discord.Collection();

      await Promise.all(
        message.guild.members.cache.map(async member => {
          const id = member.id;
          const bal_b = await client.balb(message.guild.id, id);

          console.log(`${member.user.tag} -> ${bal_b}`);

          return bal_b !== 0
            ? collection_b.set(id, {
                id,
                bal_b
              })
            : null;
        })
      );
      const data_b = collection_b.sort((a, b) => b.bal - a.bal).first(10);

      const nadie = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:coolduerme:811087907891970089> No hay ningún usuario con dinero en este servidor"
        )
        .setColor("RED")
        .setTimestamp();
      if (!data_b || data_b.length == 0) return message.channel.send(nadie);

      const tabla = new Discord.MessageEmbed()
        .setAuthor(
          `Tabla de posiciones en ${message.guild.name}`,
          message.guild.iconURL({ dynamic: true })
        )
        .setDescription(
          data_b.map((v, i) => {
            return `**${i + 1}.** [${
              client.users.cache.get(v.id).tag
            }](https://discord.gg/HV42DkNvvw) • ${symbol}${v.bal_b.toLocaleString()}`;
          })
        )
        .setColor("BLUE");
      return message.channel.send(tabla);
    }
    const collection = new Discord.Collection();

    await Promise.all(
      message.guild.members.cache.map(async member => {
        const id = member.id;
        const bal1 = await client.bal(message.guild.id, id);
        const bal2 = await client.balb(message.guild.id, id);
        const bal = bal1 + bal2;
        console.log(`${member.user.tag} -> ${bal}`);

        return bal !== 0
          ? collection.set(id, {
              id,
              bal
            })
          : null;
      })
    );
    const data = collection.sort((a, b) => b.bal - a.bal).first(10);

    const nadie = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> No hay ningún usuario con dinero en este servidor"
      )
      .setColor("RED")
      .setTimestamp();
    if (!data || data.length == 0) return message.channel.send(nadie);

    const tabla = new Discord.MessageEmbed()
      .setAuthor(
        `Tabla de posiciones en ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setDescription(
        data
          .map((v, i) => {
            return `**${i + 1}.** [${
              client.users.cache.get(v.id).tag
            }](https://discord.gg/HV42DkNvvw) • ${symbol}${v.bal.toLocaleString()}`;
          })
          .join("\n")
      )
      .setColor("BLUE");
    message.channel.send(tabla);
  }
};
