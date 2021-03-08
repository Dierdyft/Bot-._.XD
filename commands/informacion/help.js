const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Obtén la lista de comandos",
  cooldown: 5,
  aliases: ["he"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    /*
    const data = [];

    const { commands } = message.client;

    const datos = data.push(commands.map(command => command.name).join(", "))
    */
    const embed = new Discord.MessageEmbed()
      .setAuthor("Panel de ayuda", client.user.displayAvatarURL())
      .addField(
        "Configuración economia",
        `\`${prefix}add-fail ${prefix}add-replica ${prefix}set-moneda ${prefix}set-pago ${prefix}set-probabilidad ${prefix}set-tiempo ${prefix}remove-replica ${prefix}lista-replicas\``
      )
      .addField(
        "Economia",
        `\`${prefix}balance ${prefix}crimen ${prefix}diario ${prefix}doble-o-nada ${prefix}drop ${prefix}leaderboard ${prefix}pirateria ${prefix}trabajar ${prefix}hack ${prefix}depositar ${prefix}retirar ${prefix}robar\`` + 
        `\` ${prefix}comprar ${prefix}inventario ${prefix}tienda\``
      )
      .addField("Niveles", `\`${prefix}nivel ${prefix}ranking ${prefix}subida ${prefix}mensaje\``) 
      .setFooter(
        `Obtén ayuda específica de un comando con ${prefix}helpcmd [comando]`,
        client.user.displayAvatarURL()
      )
      .setColor("YELLOW");
    message.channel.send(embed);
  }
};
