<script lang="ts">
  export let url: string
  export let type: string

  const openPreview = (event: MouseEvent) => {
    if (!url) return

    if (!event.altKey) return

    window.open(url, '_blank')
  }
</script>

<p class="mt-2 text-center font-grotesk tracking-tight">Preview:</p>
{#if url && type}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={openPreview}>
    {#if type.includes('image')}
      <img
        src={url}
        alt="File preview"
        class="mx-auto h-64 w-64 max-w-xs rounded object-cover md:h-full md:w-full"
      />
    {:else if type.includes('video')}
      <video
        src={url}
        class="mx-auto max-w-xs rounded md:h-full md:w-full"
        controls
      >
        <track default kind="captions" />
      </video>
    {:else if type.includes('audio')}
      <audio src={url} controls />
    {/if}
  </div>
{:else}
  <div
    class="mx-auto h-64 w-64 animate-pulse rounded bg-gray-300 lg:h-80 lg:w-80"
  />
{/if}
