<script>
  import { leaderboard } from './stores';
  import { Navigate } from 'svelte-router-spa'
  import Score from './Score.svelte';

  let scores = [];

  $: {
    if ($leaderboard) {
      scores = [...$leaderboard.scores].sort((a, b) => b.timestamp - a.timestamp);
    }
  }
</script>

<style>
  section {
    @apply px-2;
    @apply py-6;
    @apply text-white;
    @apply font-black;
    @apply h-full;
    @apply max-w-lg;
    @apply mx-auto;
    @apply my-2;

    background-color: var(--main-color-blue-dark);
  }

  h2 {
    @apply font-black;
    @apply text-2xl;
    @apply uppercase;
    @apply text-center;
  }
</style>

<section>
  <h2>All Scores</h2>

  <div class="; my-6">
    <Navigate to="/" styles="button ; block">Leaderboard</Navigate>
  </div>

  {#each scores as score, i}
    <div class="; my-4">
      <Score {score} />
    </div>
  {/each}

  <div class="; mt-6">
    <Navigate to="/" styles="button ; block">Leaderboard</Navigate>
  </div>
</section>
