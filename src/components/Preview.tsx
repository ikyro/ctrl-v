import { Clipboard } from '../hooks/useClipboard'

export const Preview = ({ clipboard }: { clipboard: Clipboard }) => {
  return (
    <>
      <p className='mt-2 text-center font-grotesk tracking-tight'>Preview:</p>
      {clipboard ? (
        clipboard.type.includes('image') ? (
          <img
            src={clipboard.url}
            alt='paste image'
            width={250}
            height={250}
            className='mx-auto rounded object-cover'
          />
        ) : clipboard.type.includes('video') ? (
          <video
            src={clipboard.url}
            width={250}
            height={250}
            className='mx-auto rounded'
            controls
          />
        ) : clipboard.type.includes('audio') ? (
          <audio src={clipboard.url} className='mx-auto' controls />
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
