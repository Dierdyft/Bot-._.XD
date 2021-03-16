const Discord = require("discord.js");
const shopItems = require("../../shopItems.js");
const myInv = require("../../database/models/economy-global.js");
const hd = require("humanize-duration")

module.exports = {
  name: "objetos",
  description: "Mira tus objetos de la economia global",
  cooldown: 5,
  aliases: ["objetos", "objs", "objs"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    const mencion =
      message.mentions.members.first() ||
      message.guild.members.resolve(args[0]) ||
      message.member

    let data = await myInv.findOne({
      userID: mencion.id
    });
    if (!data) data = await myInv.create({ userID: mencion.id });

    let gens_oro = data.gen_oro
      .map((v, i) => {
          return `**${i + 1}.** **ID:** ${v.id} • **Tiempo:** ${hd(v.tiempo, {language: "es"})} • **Ganancia:** ${v.ganancia} • **Limite:** ${v.limite} • **Nivel:** ${v.nivel}`
      })
    if(gens_oro < 1) gens_oro = "Ninguno"
    
    let gens_elixir = data.gen_elixir
      .map((v, i) => {
          return `**${i + 1}.** **ID:** ${v.id} • **Tiempo:** ${hd(v.tiempo, {language: "es"})} • **Ganancia:** ${v.ganancia} • **Limite:** ${v.limite} • **Nivel:** ${v.nivel}`
      })
    if(gens_elixir < 1) gens_elixir = "Ninguno"

    let gens_dark_elixir = data.gen_dark_elixir
      .map((v, i) => {
          return `**${i + 1}.** **ID:** ${v.id} • **Tiempo:** ${hd(v.tiempo, {language: "es"})} • **Ganancia:** ${v.ganancia} • **Limite:** ${v.limite} • **Nivel:** ${v.nivel}`
      })
    if(gens_dark_elixir < 1) gens_dark_elixir = "Ninguno"

    ////////////////////////////////////////////////////////////
    
    let alms_oro = data.alm_oro
      .map((v, i) => {
          return `**${i + 1}.** **ID:** ${v.id} • **Limite:** ${v.limite} • **Lleva:** ${v.lleva} • **Nivel:** ${v.nivel}`
      })
    if(alms_oro < 1) alms_oro = "Ninguno"
    
    let alms_elixir = data.alm_elixir
      .map((v, i) => {
          return `**${i + 1}.** **ID:** ${v.id} • **Limite:** ${v.limite} • **Lleva:** ${v.lleva} • **Nivel:** ${v.nivel}`
      })
    if(alms_elixir < 1) alms_elixir = "Ninguno"

    let alms_dark_elixir = data.alm_dark_elixir
      .map((v, i) => {
          return `**${i + 1}.** **ID:** ${v.id} • **Limite:** ${v.limite} • **Lleva:** ${v.lleva} • **Nivel:** ${v.nivel}`
      })
    if(alms_dark_elixir < 1) alms_dark_elixir = "Ninguno"

    console.log(data.gen_oro)
    const objs = new Discord.MessageEmbed()
    .setAuthor(mencion.user.tag + " objetos", mencion.user.displayAvatarURL({dynamic: true}))
    .addField(
      "<:oro:821058189540851752> Generadores de oro:",
      gens_oro, true
    )
    .addField(
      "<:redstone:821058711174905917> Generadores de elixir:",
      gens_elixir, true
    )
    .addField(
      "<:polvora:821058493624090646> Generadores de elixir oscuro:",
      alms_dark_elixir, true
    )
    .addField(
      "<:oro:821058189540851752> Almacenes de oro:",
      alms_oro, true
    )
    .addField(
      "<:redstone:821058711174905917> Almacenes de elixir:",
      alms_elixir, true
    )
    .addField(
      "<:polvora:821058493624090646> Almacenes de elixir oscuro:",
      alms_dark_elixir, true
    )
    .setColor("YELLOW")
    message.channel.send(objs);
  }
};
