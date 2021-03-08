const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const shopItems = require("../../database/models/shopItems.js");

module.exports = {
  name: "crear-item",
  description: "Crea objetos para la tienda",
  cooldown: 5,
  aliases: ["crear item", "ci"],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    const permiso = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "<:coolduerme:811087907891970089> Ya quisieras, tienes que tener el permiso __ADMINISTRADOR__"
      )
      .setColor("RED")
      .setTimestamp();
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(permiso);

    let data = await shopItems.findOne({
      Guild: message.guild.id
    });
    let data_a = await economy.findOne({
      GuildID: message.guild.id
    });
    if (!data_a) data_a = await economy.create({ GuildID: message.guild.id });

    //----------------------------------------//
    const form_pending = new Map();

    if (form_pending.has(message.author.id))
        return message.channel.send(
          "Aun no has terminado de crear el objeto actual"
        );
    if (!args[0]) {
      
      form_pending.set(message.author.id);

      const filter = m => m.author.id === message.author.id;
      const options = { time: 120000, max: 20, errors: ["time"] } 

      message.channel.send("Registra un nombre al objeto").then(msg => {
      msg.channel.awaitMessages(filter, options).then(msg_c => {
        let name = msg_c.first().content 
        
        message.channel.send("Establece un precio").then(msg1 => {
          msg1.channel.awaitMessages(filter, options).then(msg_c1 => {
            if(isNaN(msg_c1.first().content)) return message.channel.send("Eso no es un número") 
            let price = parseInt(msg_c1.first().content) 
            
            message.channel.send("Establece una descripción").then(msg => {
          msg.channel.awaitMessages(filter, options).then(msg => {
            let desc = msg.first().content
              }) 
            }) 
          }) 
        }) 
      }) 
    })    
      

      
      //----------------------------------------//
    } else {
      const creado = new Discord.MessageEmbed()
        .setTitle("Objeto creado")
        .addField("Nombre", args.join(" "), true)
        .addField("Precio", data_a.currency + "0", true)
        .addField("Descripción", "Ninguna", true)
        .addField("Tiempo disponible", "Sin límite", true)
        .addField("Objetos disponibles", "Infinitos", true)
        .addField("Roles requeridos", "Ninguno", true)
        .addField("Roles otorgados", "Ninguno", true)
        .addField("Roles removidos", "Ninguno", true)
        .addField("Balance requerido", "Ninguno", true)
        .addField("Réplica", "Ninguna", true)
        .setColor("BLUE");

      if (data) {
        data.Items.unshift({
          nombre: args.join(" "),
          precio: 0,
          descripcion: "** **"
        });
        data.save();
        message.channel.send(creado);
      } else if (!data) {
        let newData = new shopItems({
          Guild: message.guild.id,
          Items: [
            {
              nombre: args.join(" "),
              precio: 0,
              descripcion: "** **"
            }
          ]
        });
        newData.save();
        message.channel.send(creado);
      }
    }
  }
};
