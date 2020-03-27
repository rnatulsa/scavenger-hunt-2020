<script>
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';
  import { leaderboard } from './stores';

  import GlobalStyle from './GlobalStyle.svelte';
  import GlobalHeader from './GlobalHeader.svelte';
  import Awards from './Awards.svelte';
  import HighFinishers from './HighFinishers.svelte';
  import NeighborhoodStats from './NeighborhoodStats.svelte';
  import MostRecentPlayer from './MostRecentPlayer.svelte';

  const title = 'Scavenger Hunt';
  const site = 'Renaissance Historic Neighborhood';
  const suggestion_email = 'renaissance.neighbors@gmail.com';
  const suggestion_subject = 'Suggestion for the Scavenger Hunt';
  const suggestion_href = `mailto:${suggestion_email}?subject=${encodeURI(suggestion_subject)}`;

  let ranked_scores = [];
  let most_recent_score = null;
  let points = [];
  let stats = null;
  let top_3 = [];
  let high_finishers = [];

  $: {
    if ($leaderboard) {
      ranked_scores = $leaderboard.rankedScores();
      most_recent_score = $leaderboard.mostRecentScore();
      points = $leaderboard.data.points;
      stats = $leaderboard.stats();
      top_3 = ranked_scores.slice(0, 3);
      high_finishers = ranked_scores.slice(3, 10);
    }
  }
</script>

<svelte:head>
	<title>{title} - {site}</title>
</svelte:head>

<GlobalStyle />

{#if leaderboard}
  <Router {routes} options={ {gaPageviews: true} } />
{/if}
