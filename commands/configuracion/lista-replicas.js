const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const jsp = require("jspaste");

module.exports = {
  name: "lista-replicas",
  description: "Obtén la lista de replicas",
  cooldown: 5,
  aliases: ["lista replicas", "list"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await economy.findOne({ GuildID: message.guild.id });
    if (!data) data = await economy.create({ GuildID: message.guild.id });

    let pirateria_mala = data.pirateria_malos
      .map(x => `Contenido: ${x.replica} || ID: ${x.numero}`)
      .join("\n");
    let pirateria_bien = data.pirateria_buenos
      .map(x => `Contenido: ${x.replica} || ID: ${x.numero}`)
      .join("\n");

    let crimen_mal = data.crimenes_malos
      .map(x => `Contenido: ${x.replica} || ID: ${x.numero}`)
      .join("\n");
    let crimen_bien = data.crimenes_buenos
      .map(x => `Contenido: ${x.replica} || ID: ${x.numero}`)
      .join("\n");
    let trabajos = data.trabajos.map(x => `Contenido: ${x.replica} || ID: ${x.numero}`).join("\n")

    let link = await jsp.publicar(
      `------Pirateria------\n\nReplicas de falla\n\n${pirateria_mala}\nReplicas de ganar\n\n${pirateria_bien}` +
        `\n\n------Crímenes------\n\nReplicas de falla\n\n${crimen_mal}\nReplicas de ganar\n\n${crimen_bien}`+
         `\n\n------Trabajos------\n\nReplicas\n\n${trabajos}`
    );
    const nue = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `Haz clic en lo [azul](${link.url}) para ver las replicas en un sitio aparte`
      )
      .setColor("BLUE")
      .setTimestamp();
    message.channel.send(nue);
  }
};
