const Discord = require("discord.js");
const g_economy = require("../../database/models/economy-global.js");
const db = require("quick.db");
const hd = require("humanize-duration");

module.exports = {
  name: "g-trabajar",
  description: "Gana dinero en la economia global",
  cooldown: 5,
  aliases: ["g-work", "gwork", "gtrabajar"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await g_economy.findOne({
      userID: message.author.id
    });

    let Dinero = Math.floor(Math.random() * (1000 - 100 + 1) + 1000);

    let trabajos = ["When ayudas en algo a " + client.users.cache.get("740334698513039380").username + ", but te paga con <a:plata_coin:820107603043811378>" + Dinero,
                    "Te vuelves minero, rompes el pico en el hierro, por que no importa creeper que venga para que sepa que la quieres, te jugaste la vida por ella y ganas <a:plata_coin:820107603043811378>" + Dinero,
                   "Utilizaste por primera vez el Minimo Común Multiplo, ganas <a:plata_coin:820107603043811378>" + Dinero,
                   "Te pones a vender un queque con tésito en la esquina, ganas <a:plata_coin:820107603043811378>"+ Dinero + " en la venta",
                   "أنت تفعل مومو الخاص بك على الفيديو ، وتفوز <a:plata_coin:820107603043811378>" + Dinero]
    
    let trabajo = trabajos[Math.floor(Math.random() * trabajos.length)]
    
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(trabajo)
      .setColor("GREEN");
    if (data) {
      await data.updateOne({
        userID: message.author.id,
        $inc: { oro: Dinero }
      });
      embed.setFooter("Ahora tienes " + data.dinero);
      message.channel.send(embed);
    } else if (!data) {
      let newData = new g_economy({
        userID: message.author.id,
        oro: Dinero
      });
      await newData.save();
      embed.setFooter("Ahora tienes " + Dinero);
      message.channel.send(embed);
    }
  }
};
