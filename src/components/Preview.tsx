export const Preview = ({
  base64Url,
  fileType,
}: {
  base64Url?: string
  fileType?: string
}) => {
  return (
    <>
      <p className='mt-2 text-center font-grotesk tracking-tight'>Preview:</p>
      {base64Url && fileType ? (
        fileType?.includes('image') ? (
          <img
            src={base64Url}
            alt='paste image'
            className='mx-auto h-64 w-64 max-w-xs rounded object-cover md:h-full md:w-full'
          />
        ) : fileType?.includes('video') ? (
          <video
            src={base64Url}
            className='mx-auto h-64 w-64 max-w-xs rounded md:h-full md:w-full'
            controls
          />
        ) : fileType?.includes('audio') ? (
          <audio src={base64Url} className='mx-auto' controls />
        ) : (
          <p className='mt-2 text-center font-grotesk tracking-tight'>
            format not previewable
          </p>
        )
      ) : (
        <div className='mx-auto h-64 w-64 animate-pulse rounded bg-gray-300 lg:h-80 lg:w-80' />
      )}
    </>
  )
}
