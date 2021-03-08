const Discord = require("discord.js");
const economy = require("../../database/models/economy.js");
const shopItems = require("../../database/models/shopItems.js");
const ms = require("ms");

module.exports = {
  name: "otro",
  description: "Crea objetos para la tienda",
  cooldown: 5,
  aliases: [],
  args: true,
  usage: "",
  execute: async (client, message, args, prefix) => {
    let data = await shopItems.findOne({
      Guild: message.guild.id
    });

    let data_a = await economy.findOne({
      GuildID: message.guild.id
    });

    if (!data_a) data_a = await economy.create({ GuildID: message.guild.id });

    //----------------------------------------//

    const progreso = new Discord.MessageEmbed()
      .setTitle("Creación de objeto")
      .setColor("BLUE");

    const filter = user => {
      return user.author.id === message.author.id;
    };
    const options = { time: 120000, max: 1, errors: ["time"] };

    message.channel.send(
      "<a:cargayt:790736106215702549> Establece un nombre al nuevo objeto"
    );

    let answer1 = (await message.channel.awaitMessages(filter, options)).first()
      .content;
    progreso.addField("Nombre", answer1, true);
    message.channel.send(
      "<a:cargayt:790736106215702549> Establece un precio al objeto\nUsa __saltar__ para saltar este paso\nUsa __cancelar__ para cancelar el proceso",
      progreso
    );

    let answer2;
    while (isNaN(answer2)) {
      answer2 = (await message.channel.awaitMessages(filter, options)).first()
        .content;
      if (answer2.toLowerCase() == "cancelar")
        return message.channel.send(
          "<:risan:817538141585276989> Se ha cancelado el proceso"
        );
      if (isNaN(answer2)) {
        message.channel
          .send("<a:baneo:809847807448055818> Precio proporcionado es invalido")
          .then(x => x.delete({ timeout: 5000 }));
      }
    }

    let price = parseInt(answer2);
    progreso.addField("Precio", data_a.currency + price.toLocaleString(), true);

    message.channel.send(
      "<a:cargayt:790736106215702549> Establece una descripción al objeto\nUsa __saltar__ para saltar este paso\nUsa __cancelar__ para cancelar el proceso",
      progreso
    );

    let desc = (await message.channel.awaitMessages(filter, options)).first()
      .content;
    if (desc.toLowerCase() == "cancelar")
      return message.channel.send(
        "<:risan:817538141585276989> Se ha cancelado el proceso"
      );
    progreso.addField("Descripción", desc, true);
    /*
    message.channel.send(
      "<a:cargayt:790736106215702549> Establece el tiempo que estará disponible el objeto\nUsa __saltar__ para saltar este paso\nUsa __cancelar__ para cancelar el proceso", progreso
    );

    
    let ava_time;
    while (ms(parseInt(ava_time)) == undefined) {
      ava_time = (
        await message.channel.awaitMessages(filter, options)
      ).first().content
      if (ava_time.toLowerCase() == "cancelar")
        return message.channel.send(
          "<:risan:817538141585276989> Se ha cancelado el proceso"
        );
      if (ms(parseInt(ava_time)) == undefined) {
        message.channel
          .send(
            "<a:baneo:809847807448055818> El tiempo proporcionado es invalido"
          )
          .then(x => x.delete({ timeout: 5000 }));
      }
    }
    let time_ava = ms(ava_time);

    progreso.addField("Tiempo disponible", time_ava, true) 
    */
    message.channel.send(
      "<a:cargayt:790736106215702549> Establece la limitación de objetos, o usa __infinito__\nUsa __saltar__ para saltar este paso\nUsa __cancelar__ para cancelar el proceso",
      progreso
    );

    let limit;
    while (isNaN(limit)) {
      limit = (await message.channel.awaitMessages(filter, options)).first()
        .content;
      if (limit.toLowerCase() == "cancelar")
        return message.channel.send(
          "<:risan:817538141585276989> Se ha cancelado el proceso"
        );
      if (limit.toLowerCase() == "infinito") limit = "infinito";
      if (limit !== "infinito" || isNaN(limit)) {
        message.channel
          .send(
            "<a:baneo:809847807448055818> El límite proporcionado es invalido"
          )
          .then(x => x.delete({ timeout: 5000 }));
      }
    }

    let limit_o = parseInt(limit);
    progreso.addField("Límite de objetos", limit_o, true);

    message.channel.send(
      "<a:cargayt:790736106215702549> Establece el role que se requiere para comprar el objeto\nUsa __saltar__ para saltar este paso\nUsa __cancelar__ para cancelar el proceso",
      progreso
    );

    let role = message.mentions.roles.first();

    let rol;
    while (rol !== role) {
      rol = (await message.channel.awaitMessages(filter, options)).first()
        .content;
      if (rol.toLowerCase() == "cancelar")
        return message.channel.send(
          "<:risan:817538141585276989> Se ha cancelado el proceso"
        );
      if (rol !== role) {
        message.channel
          .send(
            "<a:baneo:809847807448055818> El role proporcionado es inválido"
          )
          .then(x => x.delete({ timeout: 5000 }));
      }
    }
    let role_req = rol.name;
    progreso.addField("Role requerido", role_req, true);
    message.channel.send(progreso) 
  }
};
