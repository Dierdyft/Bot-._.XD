const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const ms = require("ms");
const hd = require("humanize-duration");

module.exports = {
  name: "test",
  description: "",
  cooldown: 5,
  aliases: [],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    const filtro = m => m.author.id == message.author.id;
    /*
    const colector = new Discord.MessageCollector(message.channel, filtro) 
    
    colector.on("collect", msg => {
      
      console.log("Se ha recolectado "+msg.content+"\n"+msg) 
    }) 
    colector.on("end", msg => {
      console.log("Se recolectó " +msg.size)
    }) 
    */
    message.channel.send("pito"); //send message

    await message.channel
      .awaitMessages(
        m => m.author.id == message.author.id, //Que el unico que pueda escribir sea el autor

        { max: 1, time: 30000 }
      )
      .then(collected => {
        //collected es la variable de la respuesta

        if (!collected.first().mentions.roles.first()) {
          //no hay roles mencionados

          return message.reply("mention a role");
        } else {
          //Escribe un rol

          message.channel.send(
            `Rol escojido: <@${collected.first().mentions.channels.first().id}>`
          );
        }
      })
      .catch(() => {
        return message.reply("Falta de respuesta :/"); //si el autor no responde
      });
  }
};
