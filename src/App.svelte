<script>
  // Components
  import GlobalStyle from './GlobalStyle.svelte';
  import GlobalHeader from './GlobalHeader.svelte';
  import Awards from './Awards.svelte';
  import HighFinishers from './HighFinishers.svelte';
  import NeighborhoodStats from './NeighborhoodStats.svelte';
  import MostRecentPlayer from './MostRecentPlayer.svelte';

  // Classes
  import Leaderboard from './leaderboard';

  let possiblePoints = null;
  let rankedScores = [];
  let mostRecentScore = null;
  let points = [];
  let stats = null;
  let top_3 = [];
  let high_finishers = [];
  let loaded = false;

  $: {
    top_3 = rankedScores.slice(0, 3);
    high_finishers = rankedScores.slice(3, 10);
  }

  const title = 'Scavenger Hunt';
  const site = 'Renaissance Historic Neighborhood';

  function onLoadLeaderboard(leaderboard) {
    loaded = true;
    possiblePoints = leaderboard.possiblePoints();
    rankedScores = leaderboard.rankedScores();
    mostRecentScore = leaderboard.mostRecentScore();
    points = leaderboard.data.points;
    stats = leaderboard.stats();
  }

  new Leaderboard({
    onLoad: onLoadLeaderboard,
    timeout: LEADERBOARD_LOAD_INTERVAL
  });
</script>

<svelte:head>
	<title>{title} - {site}</title>
</svelte:head>

<GlobalStyle />

<style>
  main {
    @apply p-4;
    @apply max-w-sm;
    @apply my-0;
    @apply mx-auto;

    min-width: 320px;
  }

  .row-2 > * {
    @apply my-4;
  }

  @screen lg {
    main {
      @apply max-w-none;
    }

    .row-2 {
      @apply flex;
    }

    .row-2 > * {
      @apply flex-1;
      @apply my-0;
      @apply ml-4;
    }
    .row-2 > *:first-child {
      @apply ml-0;
    }
  }

  .email-link {
    @apply block;
    @apply p-2;
    @apply bg-white;
    @apply uppercase;
    @apply font-bold;
    @apply leading-none;
    @apply text-center;

    color: var(--main-color-blue-dark);
  }

  .email-link:hover {
    @apply text-white;

    background-color: var(--main-color-green);
  }
</style>

<main>
  <GlobalHeader />

  {#if loaded}
  <Awards scores={top_3} />

  <div class="row-2">
    <div>
      <HighFinishers scores={high_finishers} />
    </div>
    <div>
      <NeighborhoodStats stats={stats} />
    </div>
    <div>
      <div class="; flex flex-col h-full justify-end">
        <div class="; flex-grow">
          <MostRecentPlayer score={mostRecentScore} points={points} />
        </div>
        <div class="; mt-2 flex-shrink">
          <a href="mailto:" class="email-link">
            <!-- <img alt="" src="/img/pdf.svg"> -->
            <div class="; ml-1">
              Suggestions? Click Here
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  {/if}
</main>
