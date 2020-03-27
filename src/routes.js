import Layout from './layout/Layout.svelte';
import Leaderboard from './pages/Leaderboard.svelte';
import AllScores from './pages/AllScores.svelte';

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
