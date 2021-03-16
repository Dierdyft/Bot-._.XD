const Discord = require("discord.js");
const shitpost = require("../../shitpost.json");

module.exports = {
  name: "shitpost",
  description: "Un video shitpost sin sentido",
  cooldown: 5,
  aliases: ["sp"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let videos = shitpost.video;
    let video = videos[Math.floor(Math.random() * videos.length)];

    message.channel.send(video);
  }
};
