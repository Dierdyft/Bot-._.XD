const Discord = require("discord.js");

module.exports = {
  name: "helpcmd",
  description: "Obtén ayuda detallada de un comando",
  cooldown: 5,
  aliases: ["hcmd"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    const data = [];
    const { commands } = message.client;
    const name = args[0];
    const command =
      commands.get(name) ||
      commands.find(c => c.aliases && c.aliases.includes(name));

    const embed1 = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> Ups... Especifica el comando a buscar"
      )
      .setColor("RED");
    if (!name || !name.toLowerCase()) return message.channel.send(embed1);

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolmeh:811088359212449792> WTF no tengo un comando asi"
      )
      .setColor("RED");
    if (!command) return message.channel.send(embed);

    let aliases = command.aliases;
    if (!aliases || aliases.length < 1) aliases = "Ninguno";
    if (aliases.length > 1) aliases = command.aliases.join(", ");
    console.log(aliases) 

    const ayuda = new Discord.MessageEmbed()
      .addField("Nombre", `${command.name}`)
      .addField("Aliases", aliases)
      .addField("Descripcion", command.description)
      .addField("Uso", `${prefix}${command.name} ${command.usage}`)
      .addField("Cooldown", command.cooldown || 3 + " segundos")
      .setColor("YELLOW")
      .setFooter(`Mira el panel de ayuda con ${prefix}help`);
    message.channel.send(ayuda);
  }
};
