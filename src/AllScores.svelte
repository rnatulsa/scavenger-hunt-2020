<script>
  import { leaderboard } from './stores';
  import { Navigate } from 'svelte-router-spa'

  let leaderboard_loaded = false;
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

  li {
    @apply p-2;
    @apply flex;
    @apply items-center;
    @apply my-2;
  }
  li:first-child {
    @apply mt-0;
  }
  li:last-child {
    @apply mb-0;
  }
  li:nth-child(odd) {
    background-color: var(--main-color-blue-medium);
  }
  li:nth-child(even) {
    background-color: var(--main-color-green);
  }

  .finished {
    @apply flex-initial;
    @apply font-normal;
    @apply text-sm;
  }

  .score {
    @apply bg-white;
    @apply text-center;
    @apply block;
    @apply px-1;
    @apply w-10;
    @apply h-10;
    @apply font-bold;
    @apply flex;
    @apply items-center;
  }

  .score div {
    @apply w-full;
    @apply text-center;
  }

  .name {
    @apply flex-grow;
    @apply ml-2;
  }

  .score {
    @apply flex-shrink;
    @apply text-right;
  }

  li:nth-child(odd) .score {
    color: var(--main-color-blue-medium);
  }
  li:nth-child(even) .score {
    color: var(--main-color-green);
  }
</style>

<section>
  <h2>All Scores</h2>

  <div class="; my-6">
    <Navigate to="/" styles="button ; block">Leaderboard</Navigate>
  </div>

  <ul class="; my-2">
    {#each scores as score, i}
      <li>
        <div class="finished">{score.finished.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
        <div class="name">{score.name}</div>
        <div class="score"><div>{score.total_score}</div></div>
      </li>
    {/each}
  </ul>

  <div class="; mt-6">
    <Navigate to="/" styles="button ; block">Leaderboard</Navigate>
  </div>
</section>
