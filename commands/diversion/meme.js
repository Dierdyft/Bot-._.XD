const Discord = require("discord.js");
const shitpost = require("../../shitpost.json");

module.exports = {
  name: "meme",
  description: "Un meme sin sentido",
  cooldown: 5,
  aliases: [],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let videos = shitpost.meme;
    let video = videos[Math.floor(Math.random() * videos.length)];

    message.channel.send(video);
  }
};
