import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Errors from '../Errors'
import { useUneeqError } from 'uneeq-react-core'
jest.mock('uneeq-react-core')

describe('Errors', () => {
  it('should render warnings', () => {
    ;(useUneeqError as jest.Mock).mockReturnValue({
      message: 'test message',
      level: 'warning'
    })
    const { container } = render(<Errors />)

    expect(container).toHaveTextContent('Warning')
  })

  it('should render fatal errors', () => {
    ;(useUneeqError as jest.Mock).mockReturnValue({
      message: 'test message',
      level: 'fatal'
    })
    const { container } = render(<Errors />)

    expect(container).toHaveTextContent('404 Error')
  })

  it('should render regular errors', () => {
    ;(useUneeqError as jest.Mock).mockReturnValue({
      level: 'error'
    })
    const { container } = render(<Errors />)

    expect(container).toHaveTextContent('An unknown error ocurred')
  })

  it('should not render unknown errors', () => {
    ;(useUneeqError as jest.Mock).mockReturnValue({
      level: 'unknown'
    })
    const { container } = render(<Errors />)

    expect(container).toBeEmptyDOMElement()
  })
})
