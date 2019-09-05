import { AI } from 'boardgame.io/ai';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const CoyoteAI = AI({
  enumerate: (G, ctx) => {
    let moves = [];
    let rnd = getRandomInt(20);
    if (rnd == 10) {
      moves.push({move: 'sayCoyote'});
    } else {
      moves.push({move: 'sayNumber', args: [G.count + getRandomInt(5)]});
    }

    return moves;
  }
});
