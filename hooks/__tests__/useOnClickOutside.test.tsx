import { useRef } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import useOnClickOutside from '../useOnClickOutside'

const mockHandler = jest.mock()

describe('useOnClickOutside', () => {
  it('should append and remove click listener to document', () => {
    const adder = jest.spyOn(document, 'addEventListener')
    const remover = jest.spyOn(document, 'removeEventListener')

    const renderedHook = renderHook(() =>
      useOnClickOutside(useRef(), mockHandler)
    )

    expect(adder).toHaveBeenCalled()

    renderedHook.unmount()
    expect(remover).toHaveBeenCalled()
  })
})
