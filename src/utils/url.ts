export const getBase64Url = ({ file }: { file: File | Blob }) => {
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

export const getBlobUrl = ({ file }: { file: File | Blob }) => {
  const url = URL.createObjectURL(file)

  return {
    blob: url,
  }
}
