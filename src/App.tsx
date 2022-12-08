import { Toaster } from 'react-hot-toast'
import { Header } from './components/Header'
import { Paste } from './components/Paste'
import { Preview } from './components/Preview'
import { SelectFiles } from './components/SelectFiles'
import { ShowUrl } from './components/ShowUrl'
import { useClipboard } from './hooks/useClipboard'

const App = () => {
  const {
    handleDragOver,
    handleDrop,
    handleClickPaste,
    handleClick,
    handleChange,
    base64Url,
    blobUrl,
    fileType,
  } = useClipboard()

  return (
    <>
      <div
        className='grid min-h-screen place-items-center'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Header />
        <main className='relative flex flex-col items-center justify-center gap-0.5 md:gap-1'>
          <Paste onClick={handleClickPaste} />
          <SelectFiles onClick={handleClick} onChange={handleChange} />

          <ShowUrl placeholder='Blob URL' url={blobUrl} />
          <ShowUrl placeholder='Base64 URL' url={base64Url} />

          <Preview base64Url={base64Url} fileType={fileType} />
        </main>
      </div>
      <Toaster
        position='top-right'
        toastOptions={{
          icon: '📋',
          style: {
            background: '#000',
            color: '#fff',
          },
        }}
      />
    </>
  )
}

export default App
