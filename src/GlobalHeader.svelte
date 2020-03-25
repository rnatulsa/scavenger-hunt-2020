<script>
  import { Navigate } from 'svelte-router-spa'

  const play_again_url = `https://docs.google.com/forms/d/${GOOGLE_FORM_ID}`;
</script>

<style>
  @screen lg {
    header {
      @apply flex;
      @apply items-center;
    }

    header > * {
      @apply flex-1;
    }
  }

  h1 {
    @apply bg-white;
    @apply border-8;
    @apply p-4;
    @apply text-left;
    @apply text-xl;
    @apply leading-tight;
    @apply font-black;
    @apply uppercase;
    @apply flex-initial;

    border-color: var(--main-color-blue-dark);
  }
</style>

<header>
  <Navigate to="/">
    <h1 class="; flex items-center">
      <img alt="Renaissance Neighborhood Logo" src="img/logo.jpg" class="; block flex-initial w-16">
      <div class="; flex-initial ml-4">
        Renaissance Neighborhood<br>Scavenger Hunt
      </div>
    </h1>
  </Navigate>

  <div class="; text-center lg:flex lg:items-center lg:justify-end text-3xl">
    <div class="; lg:flex-shrink lg:ml-4 my-2 p-1">
      <a target="_blank" href="/scores" class="button ; block">All Scores</a>
    </div>
    <div class="; lg:flex-shrink lg:ml-4 my-2 p-1">
      <a target="_blank" href={play_again_url} class="button ; block">Join the Hunt</a>
    </div>
    <div class="; lg:flex-initial lg:ml-4 my-2 p-1">
      <a href="/RNA-Scavenger-Hunt.pdf" class="button ; flex ; block items-center">
        <img alt="" src="/img/pdf.svg" class="; w-8 block flex-shrink">
        <div class="; ml-1 text-sm flex-grow">
          Download the PDF version
        </div>
      </a>
    </div>
  </div>
</header>
