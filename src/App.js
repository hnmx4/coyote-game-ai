import { Client } from 'boardgame.io/react';
import { Coyote } from './game';
import { CoyoteAI } from './ai';
import { CoyoteBoard } from './board';

const App = Client({
  game: Coyote,
  numPlayers: 4,
  board: CoyoteBoard,
  ai: CoyoteAI
});

export default App;
