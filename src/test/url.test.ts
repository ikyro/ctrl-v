import { Blob } from 'node:buffer'
import { readFile } from 'node:fs/promises'
import { expect, test } from 'vitest'
import { getBase64Url, getBlobUrl } from '../utils/url'

test('convert to url', async () => {
  const img = await readFile('./src/assets/example.jpg')
  const blob = new Blob([img], { type: 'image/jpeg' })
  // @ts-expect-error
  const { blob: blobUrl } = getBlobUrl({ file: blob })
  // @ts-expect-error
  const { base64 } = await getBase64Url({ file: blob })

  expect(blobUrl).include('blob:')
  expect(base64).include('data:image/jpeg;base64,')
})
