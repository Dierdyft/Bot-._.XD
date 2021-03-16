const Discord = require("discord.js");
const ytsr = require("ytsr");
const ytdl = require("ytdl-core")

module.exports = {
  name: "descargar-video",
  description: "Descarga un video de Youtube",
  cooldown: 5,
  aliases: ["des-vid"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    
    let query = args.join(" ");
    
    const res = await ytsr(query);
    const video = res.items.filter(i => i.type === "video")[0];
    const link = video.url;
    const video_down = ytdl(link, { filter: format => format.container === 'mp4' && format.qualityLabel === '480p'})
    message.channel.send(video_down)
                        
  }
};
