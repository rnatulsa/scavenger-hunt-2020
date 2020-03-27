<script>
import { Route } from 'svelte-router-spa';
import GlobalStyle from './GlobalStyle.svelte';
import GlobalHeader from './GlobalHeader.svelte';
import GlobalFooter from './GlobalFooter.svelte';

export let currentRoute;
const params = {}
</script>

<style>
  main {
    @apply p-4;
    @apply max-w-sm;
    @apply my-0;
    @apply mx-auto;

    min-width: 320px;
  }

  @screen lg {
    main {
      @apply max-w-none;
    }
  }
</style>

<GlobalStyle />

<main>
  <GlobalHeader />

  <Route {currentRoute} {params} />

  <GlobalFooter />
</main>
