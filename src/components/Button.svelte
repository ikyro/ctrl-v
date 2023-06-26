<script lang="ts">
  export let onClick: () => Promise<void>;
</script>

<button
  class="mx-auto rounded border border-black px-2.5 py-1.5 text-xs font-bold tracking-tight shadow-sm transition-colors active:border-white active:bg-black active:text-white md:text-sm md:py-2 md:px-3 md:mb-2 hover:border-white hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
  on:click={onClick}
>
  Click to paste file
</button>
