import { DragEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export type Clipboard = {
  url: {
    blob: string
    base64: string
  }
  type: string
} | null

const getBase64Url = ({ file }: { file: File | Blob }) => {
  return new Promise<{ base64: string }>((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener(
      'load',
      () => {
        resolve({ base64: reader.result as string })
      },
      false
    )

    reader.addEventListener('error', (error) => reject(error), false)

    reader.readAsDataURL(file)
  })
}

const getBlobUrl = ({ file }: { file: File | Blob }) => {
  const url = URL.createObjectURL(file)

  return {
    blob: url,
  }
}

export const useClipboard = () => {
  const [blobUrl, setBlobUrl] = useState<string>()
  const [base64Url, setBase64Url] = useState<string>()
  const [fileType, setFileType] = useState<string>()

  const fileToUrl = async ({ file }: { file: File | Blob }) => {
    const { blob } = getBlobUrl({ file })
    const { base64 } = await getBase64Url({ file })

    setBlobUrl(blob)
    setBase64Url(base64)
    setFileType(file.type)

    await navigator.clipboard
      .writeText(blob)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy in to clipboard!'))
  }

  const handleClickPaste = async () => {
    const [clipboard] = await navigator.clipboard.read()
    const [blob] = await Promise.all(
      Object.values(clipboard.types)
        .filter(
          (type) =>
            type.includes('image') ||
            type.includes('video') ||
            type.includes('audio')
        )
        .map((type) => clipboard.getType(type))
    )

    if (!blob) return

    fileToUrl({ file: blob })
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
    blobUrl,
    base64Url,
    fileType,
    handleCopyFromLocalFiles,
    handleDragOver,
    handleDrop,
    handleClickPaste,
  }
}
