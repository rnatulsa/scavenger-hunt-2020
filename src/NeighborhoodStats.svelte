<script>
  export let stats;

  let completed = [];
  let cumulative = [];

  $: {
    if (stats) {
      completed = stats.completed;
      cumulative = stats.cumulative;
    }
  }
</script>

<style>
  section {
    @apply px-2;
    @apply py-6;
    @apply text-white;
    @apply text-xs;
    @apply h-full;

    background-color: var(--main-color-blue-dark);
  }

  h2 {
    @apply font-black;
    @apply text-2xl;
    @apply uppercase;
    @apply text-center;
  }

  .group {
    @apply p-1;
    @apply mt-2;

    background-color: var(--main-color-blue-light);
  }

  @screen lg {
    .groups {
      @apply flex;
    }

    .group {
      @apply flex-1;
    }

    .group:first-child {
      @apply mr-2;
    }
  }

  .group > div {
    @apply p-2;
    background-color: var(--main-color-green);
  }

  .category {
    @apply flex;
    @apply items-center;
    @apply leading-none;
    @apply my-1;
  }
  .category:first-child {
    @apply mt-0;
  }
  .category:last-child {
    @apply mb-0;
  }

  .label {
    @apply flex-1;
    @apply text-right;
  }

  .value {
    @apply bg-white;
    @apply font-black;
    @apply text-lg;
    @apply text-center;
    @apply ml-2;
    @apply py-3;
    @apply w-16;

    color: var(--main-color-green);
  }
</style>

<section>
  <h2>Neighborhood Stats</h2>

  <div class="groups">
    <div class="group">
      {#each Object.entries(completed) as [category, stat]}
        <div class="category">
          <div class="label">Completed<br>{category}<br>Hunts</div>
          <div class="value">{stat}</div>
        </div>
      {/each}
    </div>

    <div class="group">
      {#each Object.entries(cumulative) as [category, stat]}
        <div class="category">
          <div class="label">Cumulative<br>{category}<br>Score</div>
          <div class="value">{stat}</div>
        </div>
      {/each}
  </div>
  </div>
</section>
