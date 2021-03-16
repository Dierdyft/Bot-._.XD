const Discord = require("discord.js");
const shitpost = require("../../shitpost.json");

module.exports = {
  name: "arabe",
  description: "Un video árabe sin sentido",
  cooldown: 5,
  aliases: ["arab"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let videos = shitpost.arabe;
    let video = videos[Math.floor(Math.random() * videos.length)];

    message.channel.send(video);
  }
};
