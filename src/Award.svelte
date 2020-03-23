<script>
  export let place = 'first';
  export let score = null;
</script>

<style>
  .award {
    @apply flex;
    @apply flex-wrap;
    @apply leading-tight;
    @apply mx-1;
    @apply p-2;
    @apply items-center;

    background-color: var(--main-color-blue-light);
  }

  @screen lg {
    .award {
    }
  }

  .trophy {
    width: 25%;
  }

  .name-score {
    @apply flex;
    @apply flex-1;
    @apply font-black;
    @apply text-lg;
    @apply items-center;
    @apply ml-4;

    color: var(--main-color-blue-dark);
  }

  .name-score .name {
    @apply flex-1;
  }

  .name-score .score {
    @apply mx-4;
    @apply text-right;
    @apply text-3xl;
  }

  .points {
    @apply w-full;
    @apply grid;
    @apply grid-cols-2;
    @apply gap-1;
    @apply mt-2;
  }

  .category {
    @apply text-white;
    @apply text-center;
    @apply p-1;
    @apply m-1;
    @apply uppercase;
    @apply overflow-hidden;

    background-color: var(--main-color-green);
  }

  .category .name {
    @apply text-sm;
  }
  .category .point {
    @apply text-xl;
    @apply font-bold;
  }
</style>

<div class="award">
  <div class="trophy">
    <img alt="First Place" src="/img/trophies/{place}.svg" class="; w-full">
  </div>

  <div class="name-score">
    <div class="name">
      {score.name}
    </div>
    <div class="score">
      {score.total_score}
    </div>
  </div>

  <div class="points">
    {#each Object.entries(score.category_scores) as [category, score]}
      <div class="category">
        <div class="name">{category}</div>
        <div class="point">{score}</div>
      </div>
    {/each}
  </div>
</div>
