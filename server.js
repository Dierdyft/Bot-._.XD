const http = require("http");
const express = require("express");
const app = express();
app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//------------------------------------------//

const db = require("megadb");
const Levels = require("discord-xp");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const schema = require("./database/models/schema.js");

client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

const cooldowns = new Discord.Collection();
//------------------------------------------//

const canalDB = new db.crearDB("canalesDB");
const countDB = new db.crearDB("contadorDB");
//------------------------------------------//

client.on("ready", async () => {
  console.log("Conectado como " + client.user.tag);
  await mongoose.connect(
    "mongodb+srv://Dierdyft:termos2005@primercluster.kfwzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Conectado a mongodb desde glitch");
    }
  );
});
//------------------------------------------//

client.on("message", async message => {
  //------------------------------------------//

  const prefix = "xd";
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;
  /*
  if (command.args && !args.length) {
    let reply = `No has puesto argumentos, ${message.author}!`;
    if (command.usage) {
      reply += `\nUso correcto es: \`${prefix}${command.name} ${command.usage}\``;
    }
   } 
   
    return message.channel.send(reply);
    */
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;

      const espera = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `<:mal:788516870789529640> Debes esperar ${timeLeft.toFixed(
            1
          )} segundos antes de volver a usar el comando \`${command.name}\``
        )
        .setColor("RED")
        .setTimestamp();
      return message.channel
        .send(espera)
        .then(m => m.delete({ timeout: 5000 }));
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(client, message, args, prefix);
  } catch (error) {
    console.error(error);
  }

  //------------------------------------------//
});
//------------------------------------------//

Levels.setURL(
  "mongodb+srv://Dierdyft:termos2005@primercluster.kfwzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const niveles = require("./database/models/level.js");

client.on("message", async msg => {
  //------------------------------------------//

  if (msg.author.bot) return;

  let data_LVL = await niveles.findOne({ Guild: msg.guild.id });
  if (!data_LVL) data_LVL = await niveles.create({ Guild: msg.guild.id });

  let apagador = data_LVL.toggle;
  if (apagador) {
    const randomXp = Math.floor(Math.random() * 9) + 1;
    const hasLeveledUp = await Levels.appendXp(
      msg.author.id,
      msg.guild.id,
      randomXp
    );
    if (hasLeveledUp) {
      const user = await Levels.fetch(msg.author.id, msg.guild.id);
      msg.channel.send(
        data_LVL.message
          .replace("[user]", msg.author.tag)
          .replace("[level]", user.level)
      );
    }
  }

  let conteo = await canalDB
    .obtener(`${msg.guild.id}.conteo`)
    .catch(e => console.log("Error en conteo"));
  if (msg.channel.id == conteo) {
    let number = (await countDB.obtener(msg.guild.id)) || 0;
    console.log(number);

    if (+msg.content === number) {
      msg.react("✅");
      countDB.sumar(msg.guild.id, 1);
    }
    if (+msg.content !== number) {
      msg.react("😭");
      countDB.set(msg.guild.id, 0);

      const cagaron = new Discord.MessageEmbed()
        .setAuthor(
          msg.author.tag,
          msg.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "<:risas:804921819341127751> la cargaron, ahora volvemos a empezar desde 0"
        )
        .setColor("RED");
      return msg.channel.send(cagaron);
    }
  }
});
//------------------------------------------//

client.bal = (Guild, id) =>
  new Promise(async ful => {
    const data = await schema.findOne({ Guild, id });
    if (!data) return ful(0);
    ful(data.coins);
  });

client.add = (Guild, id, coins) => {
  schema.findOne({ Guild, id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins += coins;
    } else {
      data = new schema({ Guild, id, coins });
    }
    data.save();
  });
};

client.rmv = (Guild, id, coins) => {
  schema.findOne({ Guild, id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins -= coins;
    } else {
      data = new schema({ Guild, id, coins: -coins });
    }
    data.save();
  });
};

client.balb = (Guild, id) =>
  new Promise(async ful => {
    const data = await schema.findOne({ Guild, id });
    if (!data) return ful(0);
    ful(data.bank);
  });

client.addb = (Guild, id, bank) => {
  schema.findOne({ Guild, id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.bank += bank;
    } else {
      data = new schema({ Guild, id, bank });
    }
    data.save();
  });
};

client.rmvb = (Guild, id, bank) => {
  schema.findOne({ Guild, id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.bank -= bank;
    } else {
      data = new schema({ Guild, id, bank: -bank });
    }
    data.save();
  });
};
//------------------------------------------//

client.login("Nzc3NjcyNjYzOTM0MDQyMTMy.X7G2Gw.nyp0T7DMNC-XcpgROpFqQ95ahjw");
//------------------------------------------//
