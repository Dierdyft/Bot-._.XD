const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "nojaja",
  description: "No jaja",
  cooldown: 5,
  aliases: [],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;

    let avatar = user.displayAvatarURL({
      dynamic: false,
      format: "png",
      size: 128
    });

    const canvas = Canvas.createCanvas(468, 415);

    const ctx = canvas.getContext("2d");

    let bg = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/617120220661678080/817411092359413780/nojaja.png"
    );

    ctx.drawImage(bg, 0, 0);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 70, 60, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    let imagen = await Canvas.loadImage(avatar);
    ctx.drawImage(imagen, 169, 10.7);
    let att = new Discord.MessageAttachment(canvas.toBuffer(), "nojaja.png"); 

    message.channel.send(att);
  }
};
