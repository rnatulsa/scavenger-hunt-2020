<script>
  import GlobalStyle from './GlobalStyle.svelte';
  import Leaderboard from './leaderboard';

  let possiblePoints = null;
  let scores = [];

  const title = 'Scavenger Hunt';
  const site = 'Renaissance Historic Neighborhood';

  function onLoadLeaderboard(leaderboard) {
    possiblePoints = leaderboard.possiblePoints();
    scores = leaderboard.sortedScores();
  }

  new Leaderboard({
    onLoad: onLoadLeaderboard,
    timeout: process.env.LEADERBOARD_LOAD_INTERVAL
  });
</script>

<svelte:head>
	<title>{title} - {site}</title>
</svelte:head>

<GlobalStyle />

<style>
  main {
    @apply text-center;
    @apply p-4;
    @apply max-w-xl;
    @apply my-0;
    @apply mx-auto;

    min-width: 320px;
  }
</style>

<main>
  <h1>{site} - {title}</h1>

  <p>
    <a href="https://www.rnatulsa.org/">rnatulsa.org</a>
  </p>

  <table class="; w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Finished</th>
        <th>Score {#if possiblePoints}({possiblePoints}){/if}</th>
        <th>Percent</th>
      </tr>
    </thead>
    <tbody>
        {#each scores as [timestamp, name, score, percent], i}
          <tr>
            <td>{name}</td>
            <td>{timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
            <td>{score}</td>
            <td>{Math.round(percent * 100)}%</td>
          </tr>
        {/each}
        <tr>
          <td colspan="4"></td>
        </tr>
    </tbody>
  </table>
</main>
