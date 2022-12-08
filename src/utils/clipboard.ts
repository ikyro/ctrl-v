export const writeClipboard = ({ text }: { text: string }) => {
  return navigator.clipboard.writeText(text)
}

export const readClipboard = async (
  event?: ClipboardEvent
): Promise<{ file: File | Blob | null }> => {
  if (event) {
    const clipboardData = event.clipboardData?.items

    const [file] = Object.values(clipboardData as DataTransferItemList)
      .filter((item) => item.kind === 'file')
      .map((item) => item.getAsFile())

    return {
      file,
    }
  }

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

  return {
    file: blob,
  }
}
