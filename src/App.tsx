import { Toaster } from 'react-hot-toast'
import { Form } from './components/Form'
import { Preview } from './components/Preview'
import { SelectFiles } from './components/SelectFiles'
import { useClipboard } from './hooks/useClipboard'

const App = () => {
  const { clipboard, handleCopyFromLocalFiles, handleDragOver, handleDrop } =
    useClipboard()

  return (
    <>
      <div
        className='grid min-h-screen place-items-center'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h1 className='absolute top-[4.5rem] font-grotesk text-3xl font-bold leading-tight tracking-tight lg:top-40'>
          CTRL + V
        </h1>
        <main className='relative'>
          <Form />

          <SelectFiles onClick={handleCopyFromLocalFiles} />

          <Preview clipboard={clipboard} />
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
