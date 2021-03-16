const Discord = require("discord.js");
const myInv = require("../../database/models/economy-global.js");

module.exports = {
  name: "mejorar-generador",
  description: "Mejora generadores",
  cooldown: 5,
  aliases: ["up-gen"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await myInv.findOne({
      userID: message.author.id
    });

    if (!data) data = await myInv.create({ userID: message.author.id });

    const sin_gen = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Existen 3 tipos de generadores; oro, elixir y elixir oscuro"
      )
      .setColor("RED")
      .setTimestamp();
    if (
      !args[0] ||
      !["oro", "elixir", "elixir oscuro"].includes(args[0].toLowerCase())
    )
      return message.channel.send(sin_gen)

    const sin_ = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("RED")
      .setTimestamp();
    
    const god_ = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("GREEN")
      .setTimestamp();

    if (args[0].toLowerCase() == "oro") {
      sin_.setDescription("😱 No tiene generadores de oro");
      if (data.gen_oro.length < 1) return message.channel.send(sin_);

      sin_.setDescription("😱 Específica la ID de un generador a mejorar");
      if (!args[1]) return message.channel.send(sin_);

      let busca = data.gen_oro.find(x => x.id === parseInt(args[1]));
      let dbElixir = data.alm_elixir.map(x => x.lleva);
      let myElixir= dbElixir.reduce((a, b) => a + b, 0);
      
      if (busca) {
        if(busca.nivel == 1){
          sin_.setDescription("😩 La mejora a nivel 2 cuesta 500 de elixir, no te alcanza") 
          if(myElixir < 500) return message.channel.send(sin_)
          await data.updateOne({
            gen_oro: {
              id: parseInt(args[1]), 
              tiempo: 6000,
              ganancia: 6,
              llevo: 0,
              limite: 18,
              nivel: 2,
            } 
          }) 
          
          let elixir_max = Math.max.apply(Math, data.alm_elixir.map(function(o) { return o.lleva; }))
          let arreglo_elixir = data.alm_elixir.find(x => x.lleva === elixir_max)

          await data.updateOne({
          alm_elixir: {
          id: arreglo_elixir.id,
          limite: arreglo_elixir.limite,
          lleva: arreglo_elixir.lleva - 500,
          nivel: arreglo_elixir.nivel
        }
      })
          god_.setDescription("😲 Haz mejorado el generador " + args[1] + " ha nivel 2") 
          message.channel.send(god_) 
        }
        if(busca.nivel == 2){
          sin_.setDescription("😩 La mejora a nivel 3 cuesta 1,000 de elixir, no te alcanza") 
          if(myElixir < 1000) return message.channel.send(sin_)
          await data.updateOne({
            gen_oro: {
              id: parseInt(args[1]), 
              tiempo: 7000,
              ganancia: 9,
              llevo: 0,
              limite: 27,
              nivel: 3,
            } 
          }) 
          
          let elixir_max = Math.max.apply(Math, data.alm_elixir.map(function(o) { return o.lleva; }))
          let arreglo_elixir = data.alm_elixir.find(x => x.lleva === elixir_max)

          await data.updateOne({
          alm_elixir: {
          id: arreglo_elixir.id,
          limite: arreglo_elixir.limite,
          lleva: arreglo_elixir.lleva - 1000,
          nivel: arreglo_elixir.nivel
        }
      })
          god_.setDescription("😲 Haz mejorado el generador " + args[1] + " ha nivel 3") 
          message.channel.send(god_) 
        }
        if(busca.nivel == 3){
          sin_.setDescription("😩 La mejora a nivel 4 cuesta 1,500 de elixir, no te alcanza") 
          if(myElixir < 1500) return message.channel.send(sin_)
          await data.updateOne({
            gen_oro: {
              id: parseInt(args[1]), 
              tiempo: 9000,
              ganancia: 10,
              llevo: 0,
              limite: 35,
              nivel: 4,
            } 
          }) 
          
          let elixir_max = Math.max.apply(Math, data.alm_elixir.map(function(o) { return o.lleva; }))
          let arreglo_elixir = data.alm_elixir.find(x => x.lleva === elixir_max)

          await data.updateOne({
          alm_elixir: {
          id: arreglo_elixir.id,
          limite: arreglo_elixir.limite,
          lleva: arreglo_elixir.lleva - 1500,
          nivel: arreglo_elixir.nivel
        }
      })
          god_.setDescription("😲 Haz mejorado el generador " + args[1] + " ha nivel 4") 
          message.channel.send(god_) 
        }
        
      } else if (!busca) {
        sin_.setDescription("😱 La ID que proporcionaste es invalida") 
        message.channel.send(sin_) 
      }
    }
    
    if (args[0].toLowerCase() == "elixir") {
      sin_.setDescription("😱 No tiene generadores de elixir");
      if (data.gen_elixir.length < 1) return message.channel.send(sin_);

      sin_.setDescription("😱 Específica la ID de un generador a mejorar");
      if (args[1]) return message.channel.send(sin_);

      let busca = data.gen_elixir.find(x => x.id === parseInt(args[1]));
      let dbOro = data.alm_oro.map(x => x.lleva);
      let myOro = dbOro.reduce((a, b) => a + b, 0);
      
      if (busca) {
        if(busca.nivel == 1){
          sin_.setDescription("😩 La mejora a nivel 2 cuesta 500 de oro, no te alcanza") 
          if(myOro < 500) return message.channel.send(sin_)
          await data.updateOne({
            gen_elixir: {
              id: parseInt(args[1]), 
              tiempo: 6000,
              ganancia: 6,
              llevo: 0,
              limite: 18,
              nivel: 2,
            } 
          }) 
          
          let oro_max = Math.max.apply(Math, data.alm_oro.map(function(o) { return o.lleva; }))
          let arreglo_oro = data.alm_oro.find(x => x.lleva === oro_max)

          await data.updateOne({
          alm_oro: {
          id: arreglo_oro.id,
          limite: arreglo_oro.limite,
          lleva: arreglo_oro.lleva - 500,
          nivel: arreglo_oro.nivel
        }
      })
          god_.setDescription("😲 Haz mejorado el generador " + args[1] + " ha nivel 2") 
          message.channel.send(god_) 
        }
        if(busca.nivel == 2){
          sin_.setDescription("😩 La mejora a nivel 3 cuesta 1,000 de oro, no te alcanza") 
          if(myOro < 1000) return message.channel.send(sin_)
          await data.updateOne({
            gen_elixir: {
              id: parseInt(args[1]), 
              tiempo: 7000,
              ganancia: 9,
              llevo: 0,
              limite: 27,
              nivel: 3,
            } 
          }) 
          let oro_max = Math.max.apply(Math, data.alm_oro.map(function(o) { return o.lleva; }))
          let arreglo_oro = data.alm_oro.find(x => x.lleva === oro_max)

          await data.updateOne({
          alm_oro: {
          id: arreglo_oro.id,
          limite: arreglo_oro.limite,
          lleva: arreglo_oro.lleva - 500,
          nivel: arreglo_oro.nivel
        }
      })
          god_.setDescription("😲 Haz mejorado el generador " + args[1] + " ha nivel 3") 
          message.channel.send(god_) 
        }
        if(busca.nivel == 3){
          sin_.setDescription("😩 La mejora a nivel 4 cuesta 1,500 de oro, no te alcanza") 
          if(myOro < 1500) return message.channel.send(sin_)
          await data.updateOne({
            gen_elixir: {
              id: parseInt(args[1]), 
              tiempo: 9000,
              ganancia: 10,
              llevo: 0,
              limite: 35,
              nivel: 4,
            } 
          })
          
          let oro_max = Math.max.apply(Math, data.alm_oro.map(function(o) { return o.lleva; }))
          let arreglo_oro = data.alm_oro.find(x => x.lleva === oro_max)

          await data.updateOne({
          alm_oro: {
          id: arreglo_oro.id,
          limite: arreglo_oro.limite,
          lleva: arreglo_oro.lleva - 500,
          nivel: arreglo_oro.nivel
        }
      })
          god_.setDescription("😲 Haz mejorado el generador " + args[1] + " ha nivel 4") 
          message.channel.send(god_) 
        }
        
      } else if (!busca) {
        sin_.setDescription("😱 La ID que proporcionaste es invalida") 
        message.channel.send(sin_) 
      }
    }
  }
};
