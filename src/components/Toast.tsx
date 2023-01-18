import { Toaster } from 'react-hot-toast'

export const Toast = () => {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        /* clipboard icon */
        icon: '📋',
        style: {
          backgroundColor: '#000000',
          color: '#ffffff',
          fontFamily: 'SpaceGrotesk',
        },
      }}
    />
  )
}
