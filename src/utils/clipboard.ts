export const getUrlFromLocalFiles = async () => {
  const [filePicked] = await window.showOpenFilePicker({
    excludeAcceptAllOption: true,
    types: [
      {
        description: 'Files to convert to blob URL',
        accept: {
          'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
          'video/*': ['.mp4', '.webm', '.mov'],
          'audio/*': ['.mp3', '.wav', '.ogg'],
        },
      },
    ],
  })
  const blob = await filePicked.getFile()
  const url = URL.createObjectURL(blob)

  return {
    url,
    type: blob.type,
  }
}

export const getUrlFromClipboard = async () => {
  const [clipboard] = await navigator.clipboard.read()
  const fileType = clipboard.types.find(
    (type) =>
      type.includes('image') || type.includes('video') || type.includes('audio')
  )

  const blob = await clipboard.getType(fileType as string)
  const url = URL.createObjectURL(blob)

  return {
    url,
    type: blob.type,
  }
}

export const getUrlFromPaste = async (event: ClipboardEvent) => {
  const clipboardData = event.clipboardData?.items
  const file = Object.values(clipboardData as DataTransferItemList).find(
    (item) => item.kind === 'file'
  )

  const url = URL.createObjectURL(file?.getAsFile() as File)

  return {
    url,
    type: file?.type as string,
  }
}

export const setClipboardText = async ({ text }: { text: string }) => {
  await navigator.clipboard.writeText(text)
}
