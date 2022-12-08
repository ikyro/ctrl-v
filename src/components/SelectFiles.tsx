import { type HTMLAttributes } from 'react'
import { Picture } from './Picture'

export const SelectFiles = ({
  onClick,
  onChange,
}: {
  onClick: HTMLAttributes<HTMLButtonElement>['onClick']
  onChange: HTMLAttributes<HTMLInputElement>['onChange']
}) => {
  return (
    <>
      {/* @ts-expect-error */}
      {window?.showOpenFilePicker ? (
        <button
          className='absolute top-[1px] right-7 md:top-1.5 md:right-12 lg:right-20'
          onClick={onClick}
        >
          <Picture />
        </button>
      ) : (
        <label
          htmlFor='a'
          className='absolute top-[1px] right-7 cursor-pointer md:top-1.5 md:right-12 lg:right-20'
        >
          <Picture />
          <input
            type='file'
            id='a'
            onChange={onChange}
            className='hidden'
            multiple={false}
            accept='image/*,video/*,audio/*'
          />
        </label>
      )}
    </>
  )
}
