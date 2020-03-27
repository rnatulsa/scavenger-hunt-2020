<script>
  export let score;

  let total = '•';
  let time_completed = '•';
  let best_category = '•';
  let completed_category_count = '•';

  $: {
    if (score) {
      const {best, count} = score.completion;

      total = score.total_score;
      time_completed = [
        score.finished.toLocaleDateString([], { month: 'long', day: 'numeric' }),
        score.finished.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      ].join(' – ');
      completed_category_count = score.completion.count;
      best_category = score.completion.best;
    }
  }
</script>

<style>
  section {
    @apply px-2;
    @apply py-6;
    @apply text-white;
    @apply text-xs;
    @apply uppercase;
    @apply text-center;
    @apply h-full;

    background-color: var(--main-color-blue-dark);
  }

  h2 {
    @apply font-black;
    @apply text-2xl;
    @apply uppercase;
  }

  .row {
    @apply flex;
    @apply mt-2;
  }

  .col {
    @apply flex-1;
  }

  .col:first-child {
    @apply mr-2;
  }

  .cell {
    @apply p-2;
    @apply mb-2;

    color: var(--main-color-blue-dark);
    background-color: var(--main-color-green);
  }

  label {
    @apply font-black;
    @apply text-base;
    @apply leading-none;
    @apply my-2;
    @apply block;
  }

  .value {
    @apply bg-white;
    @apply font-bold;

    color: var(--main-color-green);
  }

  .total-score .value {
    @apply text-6xl;
    @apply font-black;
    @apply py-10;
  }
</style>

<section>
  <h2>Most Recent Player</h2>

  <div class="row">
    <div class="col cell total-score">
      <label>Total Score</label>
      <div class="value ; mt-2">
        {total}
      </div>
    </div>
    <div class="col ; flex flex-col">
      <div class="cell completed-categories ; flex-1">
        <label>Completed Categories</label>
        <div class="value">{completed_category_count}</div>
      </div>
      <div class="cell time-completed ; flex-1">
        <label>Time Completed</label>
        <div class="value">{time_completed}</div>
      </div>
      <div class="cell best-category ; flex-1">
        <label>Best Category</label>
        <div class="value">{best_category}</div>
      </div>
    </div>
  </div>
</section>
