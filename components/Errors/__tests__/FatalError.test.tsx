import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import FatalError from '../FatalError'

describe('FatalError', () => {
  it('should render default values', () => {
    const { container } = render(<FatalError />)

    expect(container).toHaveTextContent('404 Error')
    expect(container).toHaveTextContent("Sorry, something's gone wrong")
  })

  it('should render custom values', () => {
    const errorMessage = 'test error message'
    const errorTitle = 'test error title'

    const { container } = render(
      <FatalError
        errorTitle={errorTitle}
        errorMessage={errorMessage}
        clearError={jest.fn()}
      />
    )

    expect(container).toHaveTextContent(errorTitle)
    expect(container).toHaveTextContent(errorMessage)
  })

  it('should render custom children', () => {
    const errorMessage = 'test error message'

    const { container } = render(
      <FatalError>
        <p>{errorMessage}</p>
      </FatalError>
    )

    expect(container).toHaveTextContent(errorMessage)
  })
})
