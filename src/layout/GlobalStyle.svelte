<script>
  import Tailwindcss from './Tailwindcss.svelte';
</script>

<Tailwindcss />

<style global>
  :root {
    --main-color-blue-light: #CDE1F9;
    --main-color-blue-medium: #678BC9;
    --main-color-blue-dark: #3A55A2;
    --main-color-green: #6BBD46;
  }

  html, body {
    /* @apply font-sans; */
    font-family: Arial, Helvetica, sans-serif;
    background-color: var(--main-color-blue-light);
  }

  .button {
    @apply block;
    @apply p-2;
    @apply bg-white;
    @apply uppercase;
    @apply font-bold;
    @apply leading-none;
    @apply text-center;

    color: var(--main-color-blue-dark);
  }

  .button:hover {
    @apply text-white;

    background-color: var(--main-color-green);
  }
</style>
