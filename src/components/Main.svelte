<script lang="ts">
  import toast from 'react-hot-toast'
  import {
    getUrlFromClipboard,
    getUrlFromLocalFiles,
    getUrlFromPaste,
  } from '../utils/clipboard'
  import Button from './Button.svelte'
  import Input from './Input.svelte'
  import Picture from './Picture.svelte'
  import Preview from './Preview.svelte'

  let blobUrl: string
  let blobUrlType: string

  const handleFilePicker = async () => {
    try {
      const { url, type } = await getUrlFromLocalFiles()

      blobUrl = url
      blobUrlType = type

      toast.success('Copied from local file')
    } catch (error) {
      toast.error('Failed to copy from local file')
    }
  }

  const handleCopyFromClipboard = async () => {
    try {
      const { url, type } = await getUrlFromClipboard()

      blobUrl = url
      blobUrlType = type

      toast.success('Copied from clipboard')
    } catch (error) {
      toast.error('Failed to copy from clipboard')
    }
  }

  const handlePaste = async (event: ClipboardEvent) => {
    try {
      const { url, type } = await getUrlFromPaste(event)

      blobUrlType = type
      blobUrl = url

      toast.success('Pasted from clipboard')
    } catch (error) {
      toast.error('No file found in clipboard')
    }
  }
</script>

<main class="flex flex-col items-center justify-center relative">
  <Button onClick={handleCopyFromClipboard} />
  <Picture onClick={handleFilePicker} />
  <Input value={blobUrl} />
  <Preview url={blobUrl} type={blobUrlType} />
</main>

<svelte:window on:paste={handlePaste} />
