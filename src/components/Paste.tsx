import { HTMLAttributes } from 'react'

export const Paste = ({
  onClick,
}: {
  onClick: HTMLAttributes<HTMLButtonElement>['onClick']
}) => {
  return (
    <button
      className='mx-auto rounded border border-black px-2.5 py-1.5 font-grotesk text-xs font-bold tracking-tight shadow-sm transition-colors active:border-white active:bg-black active:text-white md:text-sm md:py-2 md:px-3 md:mb-2'
      onClick={onClick}
    >
      Click to paste file
    </button>
  )
}
