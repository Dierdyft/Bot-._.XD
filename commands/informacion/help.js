const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Obtén la lista de comandos",
  cooldown: 5,
  aliases: ["he"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    
    const embed = new Discord.MessageEmbed()
      .setAuthor("Apartado completo de ayuda", client.user.displayAvatarURL())
      .addField(
        "Configuración economia",
        `\`${prefix}add-fail\`, \`${prefix}add-replica\`, \`${prefix}set-moneda\`, \`${prefix}set-pago\`, \`${prefix}set-probabilidad\`, \`${prefix}set-tiempo\`, \`${prefix}remove-replica\`, \`${prefix}lista-replicas\``
      )
      .addField(
        "Economia",
        `\`${prefix}balance\`, \`${prefix}crimen\`, \`${prefix}diario\`, \`${prefix}doble-o-nada\`, \`${prefix}drop\`, \`${prefix}leaderboard\`, \`${prefix}pirateria\`, \`${prefix}trabajar\`, \`${prefix}hack\`, \`${prefix}depositar\`, \`${prefix}retirar\`, \`${prefix}robar` + 
        `\` \`${prefix}comprar\`, \`${prefix}inventario\`, \`${prefix}tienda\``
      )
      .addField("Niveles", `\`${prefix}nivel\`, \`${prefix}ranking\`, \`${prefix}sistema-niveles\`, \`${prefix}lvlmensaje\`, \`${prefix}lvlcanal\`, \`${prefix}lvladd-role\`, \`${prefix}lvlremove-role\`, \`${prefix}lvlrecompensas\`, \`${prefix}ignorar-canal\`, \`${prefix}remove-canal` +
               `\` \`${prefix}lista-canales\`, \`${prefix}ignorar-role\`, \`${prefix}remove-role\`, \`${prefix}lista-roles\`, \`${prefix}reiniciar-niveles\`, \`${prefix}exp-maxima\`, \`${prefix}exp-minima\`, \`${prefix}reiniciar-niveles\`, \`${prefix}estado-niveles\`, \`${prefix}mensaje-role\``) 
      .addField("Economia (Global)", `\`${prefix}g-tienda\`, \`${prefix}g-comprar\`, \`${prefix}producir-elixir\`, \`${prefix}producir-oro\`, \`${prefix}recolectar-elixir\`, \`${prefix}recolectar-oro\`, \`${prefix}mejorar-generador\`, \`${prefix}mejorar-almacen\`, \`${prefix}g-estado\`, \`${prefix}objetos\``)
      .addField("Diversion", `\`${prefix}arabe\`, \`${prefix}jumbo\`, \`${prefix}soy-admin\`, \`${prefix}shitpost\`, \`${prefix}meme\``) 
      .setFooter(
        `Obtén ayuda específica de un comando con ${prefix}helpcmd [comando]`,
        client.user.displayAvatarURL()
      )
      .setColor("YELLOW");
    message.channel.send(embed);
  }
};
