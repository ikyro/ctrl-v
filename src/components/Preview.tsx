import { Clipboard } from '../hooks/useClipboard'

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
            className='mx-auto rounded object-cover w-64 h-64 md:w-full md:h-full'
          />
        ) : fileType?.includes('video') ? (
          <video
            src={base64Url}
            className='mx-auto rounded w-64 h-64'
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
        <div className='mx-auto h-[250px] w-[250px] animate-pulse rounded bg-gray-300' />
      )}
    </>
  )
}
