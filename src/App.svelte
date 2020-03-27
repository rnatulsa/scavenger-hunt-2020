<script>
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';

  const title = 'Scavenger Hunt';
  const site = 'Renaissance Historic Neighborhood';
  const options = { gaPageviews: true };
</script>

<svelte:head>
	<title>{title} - {site}</title>
</svelte:head>

<Router {routes} {options} />
