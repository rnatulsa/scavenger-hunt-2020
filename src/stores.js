import { readable } from 'svelte/store';
import Leaderboard from './leaderboard';

export const leaderboard = readable(null, function start(set) {
  new Leaderboard({
    onLoad: set,
    timeout: LEADERBOARD_LOAD_INTERVAL
  });
  return function stop() {};
});
