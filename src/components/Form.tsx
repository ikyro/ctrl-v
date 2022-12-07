import { FormEvent } from 'react'

export const Form = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className='relative'>
      <input
        type='text'
        placeholder='paste'
        className='peer w-60 border-b-2 border-gray-300 p-0.5 font-grotesk text-sm leading-tight tracking-tight shadow-md outline-none lg:w-72'
      />
      <span className='absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all peer-focus:w-full' />
    </form>
  )
}
