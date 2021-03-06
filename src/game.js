import { Game } from 'boardgame.io/core';

const DOUBLE = 'x2';
const MAX_ZERO = 'MAX -> 0';
const RANDOM = '?';

const ALL_CARDS = [
  20, 15, 15, 10, 10, 10,
  5, 5, 5, 5, 4, 4, 4, 4,
  3, 3, 3, 3, 2, 2, 2, 2,
  1, 1, 1, 1, 0, 0, 0, 0,
  -5, -5, -10, DOUBLE, MAX_ZERO, RANDOM
];

function aggregate(G) {
  let existMaxZero = false;
  let existDouble = false;

  let numberCards = [];
  for (let playerID in G.players) {
    let card = G.players[playerID].card;
    if (typeof(card) === 'number') {
      numberCards.push(card);
    } else if (card === RANDOM) {
      numberCards.push(G.randomCard);
    } else if (card === MAX_ZERO) {
      existMaxZero = true;
    } else if (card === DOUBLE) {
      existDouble = true;
    } else {
      throw new Error(`unknown card: ${card}`);
    }
  }

  let max = Math.max.apply(null, numberCards);
  let sum = 0;
  numberCards.forEach((card) => {
    if (!existMaxZero || card !== max) {
      sum += card;
    };
  });

  return existDouble ? sum * 2 : sum;
}

export const Coyote = Game({
  setup: (ctx) => {
    let cards = ctx.random.Shuffle(ALL_CARDS);
    let players = {};
    for (let i = 0; i < ctx.numPlayers; i++) {
      players[`${i}`] = { card: cards[i] };
    }
    return { count: 0, players: players, randomCard: cards[ctx.numPlayers] };
  },

  moves: {
    sayNumber(G, ctx, number) {
      return { ...G, count: number, lastPlayer: ctx.currentPlayer, total: aggregate(G) };
    },

    sayCoyote(G, ctx) {
      return { ...G, coyoteTargetPlayer: G.lastPlayer, lastPlayer: ctx.currentPlayer };
    }
  },

  flow: {
    movesPerTurn: 1,
    endGameIf: (G, ctx) => {
      if (G.coyoteTargetPlayer !== undefined){
        return G.count > aggregate(G) ? G.coyoteTargetPlayer : G.lastPlayer;
      }
    }
  }
});
