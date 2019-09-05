import { Client } from 'boardgame.io/react';
import { Coyote } from './game';
import { CoyoteAI } from './ai';
import { CoyoteBoard } from './board';

const App = Client({
  game: Coyote,
  board: CoyoteBoard,
  ai: CoyoteAI
});

export default App;
