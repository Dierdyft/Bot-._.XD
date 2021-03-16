const Discord = require("discord.js");
const shopItems = require("../../shopItems.js");
const myInv = require("../../database/models/economy-global.js");

module.exports = {
  name: "g-comprar",
  description: "Compra algo de la tienda global",
  cooldown: 5,
  aliases: ["gcomprar", "g-buy", "gbuy"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    
    const argumento = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolsob:811088449024294922> ¿Que objeto quieres comprar?"
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0]) return message.channel.send(argumento);

    const itemToBuy = args.join(" ").toLowerCase();

    let validItem = !!shopItems.find(
      val => val.item.toLowerCase() === itemToBuy
    );

    const noEsta = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolsob:811088449024294922> El objeto que quieres comprar no se encuentra en la tienda"
      )
      .setColor("RED")
      .setTimestamp();
    if (!validItem) return message.channel.send(noEsta);

    const itemPrice = shopItems.find(val => val.item.toLowerCase() == itemToBuy)
      .price;

    let data = await myInv.findOne({
      userID: message.author.id
    });
    if (!data) data = await myInv.create({ userID: message.author.id });

    let oro_map = data.alm_oro.map(x => x.lleva);
    let oro_red = oro_map.reduce((a, b) => a + b, 0);
      
    let elixir_map = data.alm_elixir.map(x => x.lleva);
    let elixir_red = elixir_map.reduce((a, b) => a + b, 0);
      
    let d_elixir_map = data.alm_dark_elixir.map(x => x.lleva);
    let d_elixir_red = d_elixir_map.reduce((a, b) => a + b, 0);
    
    const itemTipo = shopItems.find(val => val.item.toLowerCase() == itemToBuy);

    const no_alcanza = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("RED")
      .setTimestamp();
    if (itemTipo.tipo == "Oro") {
      no_alcanza.setDescription("No tienes oro suficiente para el objeto")
      if (oro_red < itemPrice) return message.channel.send(no_alcanza);
    } else if (itemTipo.tipo == "Elixir") {
      no_alcanza.setDescription("No tienes elixir suficiente para el objeto")
      if (elixir_red < itemPrice) return message.channel.send(no_alcanza);
    } else if (itemTipo.tipo == "Elixir oscuro") {
      no_alcanza.setDescription("No tienes elixir oscuro suficiente para el objeto")
      if (d_elixir_red < itemPrice) return message.channel.send(no_alcanza);
    }

    let ID = Math.floor(Math.random() * (9999 - 100 + 1) + 9999);

    const compra = new Discord.MessageEmbed()
    .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
    .setColor("GREEN")
    
    //---------------------------------------------------//
    
    if (itemToBuy == "generador de oro") {
      data.gen_oro.unshift({
        id: ID,
        tiempo: itemTipo.tiempo,
        ganancia: itemTipo.ganancia,
        llevo: itemTipo.lleva,
        limite: itemTipo.limite,
        nivel: itemTipo.nivel
      });
      data.save();
      
      let elixir_max = Math.max.apply(Math, data.alm_elixir.map(function(o) { return o.lleva; }))
      let arreglo_elixir = data.alm_elixir.find(x => x.lleva === elixir_max)

      await data.updateOne({
        alm_elixir: {
          id: arreglo_elixir.id,
          limite: arreglo_elixir.limite,
          lleva: arreglo_elixir.lleva - itemPrice,
          nivel: arreglo_elixir.nivel
        }
      })
      compra.setDescription("Haz comprado un **"+itemToBuy+"**")
      compra.setFooter("Generador ID: "+ ID)
      message.channel.send(compra)
    }
    
    //---------------------------------------------------//
    
    if (itemToBuy == "generador de elixir") {
      data.gen_elixir.unshift({
        id: ID,
        tiempo: itemTipo.tiempo,
        ganancia: itemTipo.ganancia,
        llevo: itemTipo.lleva,
        limite: itemTipo.limite,
        nivel: itemTipo.nivel
      });
      data.save();

      let oro_max = Math.max.apply(Math, data.alm_oro.map(function(o) { return o.lleva; }))
      let arreglo_oro = data.alm_oro.find(x => x.lleva === oro_max)

      await data.updateOne({
        alm_oro: {
          id: arreglo_oro.id,
          limite: arreglo_oro.limite,
          lleva: arreglo_oro.lleva - itemPrice,
          nivel: arreglo_oro.nivel
        }
      })
      compra.setDescription("Haz comprado un **"+itemToBuy+"**")
      compra.setFooter("Generador ID: "+ ID)
      message.channel.send(compra)
    }
    
    //---------------------------------------------------//
    
    if (itemToBuy == "almacen de elixir") {
      data.alm_elixir.unshift({
        id: ID,
        limite: itemTipo.limite,
        lleva: itemTipo.lleva,
        nivel: itemTipo.nivel
      });
      data.save();

      let oro_max = Math.max.apply(Math, data.alm_oro.map(function(o) { return o.lleva; }))
      let arreglo_oro = data.alm_oro.find(x => x.lleva === oro_max)

      await data.updateOne({
        alm_oro: {
          id: arreglo_oro.id,
          limite: arreglo_oro.limite,
          lleva: arreglo_oro.lleva - itemPrice,
          nivel: arreglo_oro.nivel
        }
      })
      compra.setDescription("Haz comprado un **"+itemToBuy+"**")
      compra.setFooter("Almacen ID: "+ ID)
      message.channel.send(compra)
    }
    if (itemToBuy == "almacen de oro") {
      data.alm_oro.unshift({
        id: ID,
        limite: itemTipo.limite,
        lleva: itemTipo.lleva,
        nivel: itemTipo.nivel
      });
      data.save();
      
      let elixir_max = Math.max.apply(Math, data.alm_elixir.map(function(o) { return o.lleva; }))
      let arreglo_elixir = data.alm_elixir.find(x => x.lleva === elixir_max)

      await data.updateOne({
        alm_elixir: {
          id: arreglo_elixir.id,
          limite: arreglo_elixir.limite,
          lleva: arreglo_elixir.lleva - itemPrice,
          nivel: arreglo_elixir.nivel
        }
      })
      
      compra.setDescription("Haz comprado un **"+itemToBuy+"**")
      compra.setFooter("Almacen ID: "+ ID)
      message.channel.send(compra)
    }
  }
};
