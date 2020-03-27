<script>
  import { Navigate } from 'svelte-router-spa'

  export let scores = [];
  export let offset = 3;
</script>

<style>
  section {
    @apply px-2;
    @apply py-6;
    @apply text-white;
    @apply font-black;
    @apply h-full;

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

  .place {
    @apply flex-initial;
  }

  .place span {
    @apply bg-white;
    @apply text-center;
    @apply inline-block;
    @apply px-1;
    @apply w-6;
    @apply h-6;
    @apply font-bold;
  }

  .name {
    @apply flex-grow;
    @apply ml-2;
  }

  .score {
    @apply flex-shrink;
    @apply text-right;
  }

  li:nth-child(odd) .place {
    color: var(--main-color-blue-medium);
  }
  li:nth-child(even) .place {
    color: var(--main-color-green);
  }
</style>

<section>
  <h2>Top Ten</h2>

  <ul class="; my-2">
    {#each scores as score, i}
      <li>
        <div class="place"><span>{i+offset+1}</span></div>
        <div class="name">{score.name}</div>
        <div class="score">{score.total_score}</div>
      </li>
    {/each}
  </ul>

  <div class="; mt-6">
    <Navigate to="/scores" styles="button ; block">See All Scores</Navigate>
  </div>
</section>
