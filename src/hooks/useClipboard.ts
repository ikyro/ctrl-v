import { ChangeEvent, DragEvent, useEffect, useState } from 'react'
import { readClipboard, writeClipboard } from '../utils/clipboard'
import { getBase64Url, getBlobUrl } from '../utils/url'
import toast from 'react-hot-toast'

export type UseClipboard = {
  blobUrl?: string
  base64Url?: string
  fileType?: string
}

export const useClipboard = () => {
  const [blobUrl, setBlobUrl] = useState<UseClipboard['blobUrl']>()
  const [base64Url, setBase64Url] = useState<UseClipboard['base64Url']>()
  const [fileType, setFileType] = useState<UseClipboard['fileType']>()

  const showNotify = async ({ file }: { file: File | Blob }) => {
    const { blob } = getBlobUrl({ file })
    const { base64 } = await getBase64Url({ file })

    setBlobUrl(blob)
    setBase64Url(base64)
    setFileType(file.type)

    console.log({ base64 })

    await writeClipboard({ text: blob })
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy in to clipboard!'))
  }

  const handleClickPaste = async () => {
    const { file } = await readClipboard()

    if (!file) return

    showNotify({ file })
  }

  const handlePaste = async (event: ClipboardEvent) => {
    const { file } = await readClipboard(event)

    if (!file) return

    await showNotify({ file })
  }

  const handleClick = async () => {
    const [file] = await window.showOpenFilePicker({
      excludeAcceptAllOption: true,
      types: [
        {
          description: 'Files to convert to URL',
          accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
            'video/*': ['.mp4', '.webm', '.mov'],
            'audio/*': ['.mp3', '.wav', '.ogg'],
          },
        },
      ],
    })
    const fileHandle = await file.getFile()

    await showNotify({ file: fileHandle })
  }

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.currentTarget.files as FileList

    if (!file) return

    await showNotify({ file })
  }

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files.item(0)

    if (!file) return

    await showNotify({ file })
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
    handleClick,
    handleChange,
    handleDragOver,
    handleDrop,
    handleClickPaste,
  }
}
