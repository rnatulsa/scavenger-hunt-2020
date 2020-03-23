<script>
  import Award from './Award.svelte';

  export let scores = [];

  const places = ['first', 'second', 'third'];
</script>

<style>
  section {
    @apply my-4;
    @apply border;
    @apply px-1;
    @apply py-6;

    background-color: var(--main-color-blue-dark);
    border-color: var(--main-color-blue-dark);
  }

  section > * {
    @apply my-2;
  }

  @screen lg {
    section {
      @apply flex;
    }

    section > * {
      @apply flex-1;
    }
  }
</style>

<section>
  {#each scores as score, i}
    <div><Award place={places[i]} score={score} /></div>
  {/each}
</section>
