<script>
  import { leaderboard } from './stores';

  import Awards from './Awards.svelte';
  import HighFinishers from './HighFinishers.svelte';
  import NeighborhoodStats from './NeighborhoodStats.svelte';
  import MostRecentPlayer from './MostRecentPlayer.svelte';

  const suggestion_email = 'renaissance.neighbors@gmail.com';
  const suggestion_subject = 'Suggestion for the Scavenger Hunt';
  const suggestion_href = `mailto:${suggestion_email}?subject=${encodeURI(suggestion_subject)}`;

  let leaderboard_loaded = false;
  let ranked_scores = [];
  let most_recent_score = null;
  let points = [];
  let stats = null;
  let top_3 = [];
  let high_finishers = [];

  $: {
    if ($leaderboard) {
      leaderboard_loaded = true;
      ranked_scores = $leaderboard.rankedScores();
      most_recent_score = $leaderboard.mostRecentScore();
      points = $leaderboard.data.points;
      stats = $leaderboard.stats();
      top_3 = ranked_scores.slice(0, 3);
      high_finishers = ranked_scores.slice(3, 10);
    }
  }
</script>

<style>
  .row-2 > * {
    @apply my-4;
  }

  @screen lg {
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

{#if leaderboard_loaded}
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
          <MostRecentPlayer score={most_recent_score} points={points} />
        </div>
        <div class="; mt-2 flex-shrink">
          <a href={suggestion_href} class="email-link">
            <div class="; ml-1">
              Suggestions? Click Here
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}
