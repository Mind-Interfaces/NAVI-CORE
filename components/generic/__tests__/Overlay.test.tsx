import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Overlay from '../Overlay'

describe('Overlay', () => {
  it('should render correctly', () => {
    const message = 'test message'

    const { container } = render(<Overlay>{message}</Overlay>)

    expect(container).toHaveTextContent(message)
  })
})
