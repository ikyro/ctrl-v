import { DragEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export type Clipboard =
  | {
      url: string
      type: string
    }
  | undefined

export const useClipboard = () => {
  const [clipboard, setClipboard] = useState<Clipboard>()

  const fileToUrl = async ({ file }: { file: File }) => {
    const url = URL.createObjectURL(file)
    toast.success('Copied to clipboard!')

    await navigator.clipboard.writeText(url)

    setClipboard({ url, type: file.type })
  }

  const handlePaste = async (event: ClipboardEvent) => {
    const clipboardData = event.clipboardData?.items

    const [file] = Object.values(clipboardData as DataTransferItemList)
      .filter((item) => item.kind === 'file')
      .map((item) => item.getAsFile())

    if (!file) return

    await fileToUrl({ file })
  }

  const handleCopyFromLocalFiles = async () => {
    const types: FilePickerOptions['types'] = [
      {
        description: 'Files to convert to URL',
        accept: {
          'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
          'video/*': ['.mp4', '.webm', '.mov'],
          'audio/*': ['.mp3', '.wav', '.ogg'],
        },
      },
    ]

    if (window?.showOpenFilePicker) {
      const [file] = await window.showOpenFilePicker({
        excludeAcceptAllOption: true,
        types,
      })
      const fileHandle = await file.getFile()
      await fileToUrl({ file: fileHandle })
    } else {
      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = false

      input.addEventListener('change', async () => {
        const [file] = input.files as FileList
        await fileToUrl({ file })
      })

      input.click()
    }
  }

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files.item(0)
    if (!file) return

    await fileToUrl({ file })
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  useEffect(() => {
    window.document.documentElement.addEventListener('paste', handlePaste)

    return () => {
      window.document.documentElement.removeEventListener('paste', handlePaste)
    }
  }, [])

  return {
    clipboard,
    handleCopyFromLocalFiles,
    handleDragOver,
    handleDrop,
  }
}
