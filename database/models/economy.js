const mongo = require("mongoose");

const economy = new mongo.Schema({
  GuildID: String,
  currency: {
    type: String,
    default: "🤑"
  },
  TimeWork: {
    type: Number,
    default: 300000
  },
  maxMoneyWork: {
    type: Number,
    default: 500
  },
  minMoneyWork: {
    type: Number,
    default: 300
  },
  trabajos: {
    type: Array,
    default: [
      {
        replica: `Consigues un empleo de medio tiempo y te pagan [plata]`,
        numero: 100023
      },
      {
        replica: `Programas una aplicación para una compañía y consigues [plata]`,
        numero: 100027
      },
      {
        replica: `Consigues un total de [plata] gracias a las comparas online`,
        numero: 100073
      },
      {
        replica: `Eres alto negociante y consigues [plata] por tu trabajo y arduo esfuerzo`,
        numero: 100041
      }
    ]
  },
  crimen_probabilidad: {
    type: Number,
    default: 50
  },
  TimeCrime: {
    type: Number,
    default: 300000
  },
  maxMoneyCrime: {
    type: Number,
    default: 500
  },
  minMoneyCrime: {
    type: Number,
    default: 300
  },
  crimenes_buenos: {
    type: Array,
    default: [
      {
        replica: `Te has puesto a hacer raids en Discord y consigues [plata] para nitro`,
        numero: 100056
      },
      {
        replica: `Subiste un juego a la deepweb, y ahora la gente lo sube a Youtube cobrando [plata] por cada video`,
        numero: 100042
      },
      {
        replica: `Vigilas una pizzeria de muñecos asesinos, sobrevives 5 noches y cobras [plata]`,
        numero: 100072
      }
    ]
  },
  crimenes_malos: {
    type: Array,
    default: [
      {
        replica: `Te atraparon subiendo gore a forogore y te quitan [plata]`,
        numero: 185229
      },
      {
        replica: `Ibas a raidear un servidor pero te banearon XD y pierdes [plata]`,
        numero: 158836
      },
      {
        replica: `When caminas, but te caes en una alcantarilla y mueres, y claro pierdes [plata]`,
        numero: 122236
      }
    ]
  },
  pirateria_probabilidad: {
    type: Number,
    default: 50
  },
  TimePirateria: {
    type: Number,
    default: 300000
  },
  maxMoneyPirateria: {
    type: Number,
    default: 500
  },
  minMoneyPirateria: {
    type: Number,
    default: 300
  },
  pirateria_buenos: {
    type: Array,
    default: [
      {
        replica: `Te pones a insertar virus en pc's y consigues [plata] por cada archivo`,
        numero: 234778
      },
      {
        replica: `Jugaste un juego que te provoco 15 paros cardíacos por minuto pero fue por un speedrun y ganas [plata]`,
        numero: 100086
      },
      {
        replica: `Entraste a un servidor donde te regalaban nitro, consigues y lo cambias por [plata]`,
        numero: 524862
      }
    ]
  },
  pirateria_malos: {
    type: Array,
    default: [
      {
        replica: `Estabas haciendo un bot para raids pero te terminan baneando pagando una sanción de [plata]`,
        numero: 258456
      },
      {
        replica: `Intentaste hackear el clash royale pero te agarra la policía en tu casa y pagas una multa de [plata]`,
        numero: 412532
      },
      {
        replica: `Hacías un truco en una moto pero te partes la cabeza y la moto, pagando [plata] para restaurarla`,
        numero: 124586
      }
    ]
  },
  hack_probabilidad: {
    type: Number,
    default: 50
  },
  TimeHack: {
    type: Number,
    default: 300000
  },
  maxMoneyHack: {
    type: Number,
    default: 500
  },
  minMoneyHack: {
    type: Number,
    default: 300
  }
});

module.exports = mongo.model("currency", economy);
