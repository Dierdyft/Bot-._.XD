const Discord = require("discord.js");
const createBar = require("string-progressbar");
const hd = require("humanize-duration");

module.exports = {
  name: "info",
  description: "Obtén información...",
  cooldown: 5,
  aliases: ["xd"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let guild = client.guilds.cache.size.toLocaleString();
    let user = client.users.cache.size.toLocaleString();
    let channel = client.channels.cache.size.toLocaleString();
    let emoji = client.emojis.cache.size.toLocaleString();

    let total = process.memoryUsage().heapTotal;
    let usada = process.memoryUsage().heapUsed;
    let barra = createBar(total, usada, 10, "□", "■");

    let totalMB = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);
    let usadaMB = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

    let up = hd(client.uptime, { language: "es" });

    let date = Date.now();
    let ping_db = await new Promise((r, j) => {
      require("mongoose")
        .connection.myFirstDatabase.levels()
        .ping((err, result) =>
          err || !result ? j(err || result) : r(Date.now() - date)
        );
    });
    const info = new Discord.MessageEmbed()
      .setAuthor(
        client.user.username + " información",
        client.user.displayAvatarURL()
      )
      .addField(
        "Estadistica general",
        `**Servidores:** ${guild}\n**Usuarios:** ${user}\n**Canales:** ${channel}\n**Emoticones:** ${emoji}\n**Memoria utilizada:** ${
          barra[0]
        } [${usadaMB} / ${totalMB}] MegaBytes\n**Tiempo de actividad:** ${up}\n**Comandos:** ${
          client.commands.size
        }`
      )
      .addField(
        "Estadistica del hardware",
        `**Plataforma:** Windows 10\n**Procesador:** AMD E2-9000e RADEON R2, 4 COMPUTE CORES 2C+2G   1.50 GHz\n**Memoria instalada (RAM):** ■□□□□□□□□□ [0,12 / 4,00] MegaBytes\n**Tipo de sistema:** Sistema operativo de 64 bits, procesador x64`
      )
      .addField(
        "Velocidad",
        `**Velocidad de la API:** ${
          client.ws.ping
        } milisegundos\n**Velocidad del mensaje:** ${Date.now() -
          message.createdTimestamp} milisegundos\n**Velocidad de la base de datos:** ${ping_db} milisegundos`
      )
      .setColor("YELLOW")

      .addField("Gente que ha cooperado", "TheEaterOfSouls jaja que gracioso");
    message.channel.send(info);
  }
};
