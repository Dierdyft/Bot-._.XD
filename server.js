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

for (const file of fs.readdirSync("./eventos/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContent = require(`./eventos/${file}`);
    client.on(fileName, fileContent.bind(null, client));
    delete require.cache[require.resolve(`./eventos/${file}`)];
  }
}

const cooldowns = new Discord.Collection();
//------------------------------------------//

const canalDB = new db.crearDB("canalesDB");
const countDB = new db.crearDB("contadorDB");
const prefixDB = new db.crearDB("prefixDB");
//------------------------------------------//

client.on("message", async message => {
  //------------------------------------------//

  if (!prefixDB.tiene(message.guild.id)) {
    prefixDB.set(message.guild.id, "xd");
  }

  const prefix = await prefixDB.get(message.guild.id);
  
  const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`)
  
  if(!prefixRegex.test(message.content)) return 
  
  const [, matchedPrefix] = message.content.match(prefixRegex)
  if (!message.content.startsWith(matchedPrefix) || message.author.bot) return;

  const args = message.content
    .slice(matchedPrefix.length)
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
//------------------------------------------//

client.on("message", async msg => {
  if (msg.author.bot) return;

  let data_LVL = await niveles.findOne({ Guild: msg.guild.id });
  if (!data_LVL) data_LVL = await niveles.create({ Guild: msg.guild.id });

  let apagador = data_LVL.toggle;
  let channel = data_LVL.channel;
  if (!data_LVL.channel) channel = msg.channel.id;

  if (!data_LVL.ignore_channel.includes(msg.channel.id)) {
    if (
      !msg.member.roles.cache.some(x => data_LVL.ignore_roles.includes(x.id))
    ) {
      if (apagador) {
        const randomXp = Math.floor(
          Math.random() * (data_LVL.exp_max - data_LVL.exp_min + 1) +
            data_LVL.exp_min
        );
        const hasLeveledUp = await Levels.appendXp(
          msg.author.id,
          msg.guild.id,
          randomXp
        );
        if (hasLeveledUp) {
          const user = await Levels.fetch(msg.author.id, msg.guild.id);
          client.channels.cache
            .get(channel)
            .send(
              data_LVL.message
                .replace("[user]", msg.author.tag)
                .replace("[level]", user.level)
            );
          let roll = data_LVL.roles.find(e => e.lvl == parseInt(user.level));
          if (roll) {
            await msg.member.roles.add(roll.rol);
            if (mensaje_role.includes("[level]")) {
              client.channels.cache
            .get(channel)
            .send(data_LVL.mensaje_role)
                .replace("[user]", msg.author.tag)
                .replace("[role]", msg.guild.roles.resolve(roll.rol).toString())
                .replace("[level]", user.level);
            } else {
              client.channels.cache
            .get(channel)
            .send(data_LVL.role_message)
                .replace("[user]", msg.author.tag)
                .replace("[role]", msg.guild.roles.resolve(roll.rol).toString())
            }
          }
        }
      }
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

client.login(process.env.token);
//------------------------------------------//
