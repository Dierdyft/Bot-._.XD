const Discord = require("discord.js");
const jsp = require("jspaste");

module.exports = {
  name: "evaluar",
  description: "Mi creador evaluará un codigo",
  cooldown: 5,
  aliases: ["ev", "eval", "e"],
  args: true,
  usage: "<codigo>",
  execute: async (client, message, args) => {
    if (message.author.id !== "740334698513039380") return;

    const b = new Discord.MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )

      .setDescription(
        "<a:nocool:811087996832710676> Proporciona el código a evaluar"
      )
      .setColor("RED")
      .setTimestamp();
    if (!args[0]) return message.channel.send(b);

    async function enviar(mensaje) {
      return await message.channel.send(mensaje);
    }
    async function exec(codigo) {
      return await require("child-process").execSync(codigo);
    }

    function mayuscula(string) {
      string = string.replace(/[^a-z]/gi, "");
      return string[0].toUpperCase().string.slice(1);
    }

    try {
      let code = args.join(" ");
      let evalued = await eval(code);
      if (typeof evalued !== "string")
        evalued = require("util").inspect(evalued, { depth: 2 });

      let txt = "" + evalued;

      if (txt.length > 2000) {
        let link = await jsp.publicar(`${txt}`);

        message.channel.send(
          "```py\n" +
            "message.author.send('El código evaluado es demasiado extenso, así que lo envié a tus mensajes privados') " +
            "\n```"
        );
        message.author.send(link.url);
      } else {
        message.channel.send("```py\n" + txt + "\n```");
      }
    } catch (err) {
      message.channel.send("```\n" + err + "\n```");
    }
  }
};
