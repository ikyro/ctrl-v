import { MouseEvent } from 'react'
import toast from 'react-hot-toast'

export const ShowUrl = ({
  url,
  placeholder,
}: {
  url?: string
  placeholder: string
}) => {
  const handleClick = async (event: MouseEvent<HTMLElement>) => {
    const [input] = event.currentTarget.children
    const { value } = input as HTMLInputElement

    if (!value.length) return

    await navigator.clipboard
      .writeText(value)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy in to clipboard!'))
  }

  return (
    <section className='relative' onClick={handleClick}>
      <input
        type='text'
        placeholder={placeholder}
        className='peer w-72 border-b-2 border-gray-300 p-0.5 font-grotesk text-sm leading-tight tracking-tight shadow-md outline-none hover:cursor-pointer md:w-80 lg:w-96 md:text-sm'
        defaultValue={url}
        disabled
      />
      <span className='absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all peer-hover:w-full peer-active:w-full' />
    </section>
  )
}
