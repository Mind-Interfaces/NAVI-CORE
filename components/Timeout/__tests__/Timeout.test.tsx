import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Timeout from '../Timeout'
import { useTimeout, useUneeqState } from 'uneeq-react-core'

jest.mock('uneeq-react-core')
;(useUneeqState as jest.Mock).mockReturnValue({
  timeoutOpen: true,
  timeLeft: 300000
})
;(useTimeout as jest.Mock).mockReturnValue({
  timeoutOpen: true,
  timeLeft: 300000,
  resetTimeout: jest.fn(),
  endSession: jest.fn()
})

describe('Timeout', () => {
  it('should render correctly', () => {
    const { container } = render(<Timeout />)

    expect(container).toHaveTextContent('Are you still there?')
  })
})
