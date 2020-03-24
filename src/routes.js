import Layout from './Layout.svelte';
import Leaderboard from './Leaderboard.svelte';
import AllScores from './AllScores.svelte';

const routes = [
  {
    name: '/',
    component: Leaderboard,
    layout: Layout
  },
  {
    name: 'scores',
    component: AllScores,
    layout: Layout
  }
];

export { routes };
export default routes;
