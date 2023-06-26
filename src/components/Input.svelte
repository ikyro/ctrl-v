<script lang="ts">
  import toast from 'react-hot-toast'
  import { setClipboardText } from '../utils/clipboard'

  export let value: string

  const handleCopy = async () => {
    if (!value) return

    try {
      setClipboardText({ text: value })
      toast.success('Copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }
</script>

<section class="relative">
  <input
    type="text"
    class="peer w-72 truncate border-b-2 border-gray-300 p-0.5 text-sm leading-tight tracking-tight shadow-md outline-none hover:cursor-pointer md:w-80 md:text-sm lg:w-96 dark:border-gray-600 dark:text-white dark:bg-black"
    placeholder="Blob URL"
    on:click={handleCopy}
    bind:value
    readonly
  />
  <span
    class="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all peer-hover:w-full peer-active:w-full dark:bg-white"
  />
</section>
