import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Warning from '../Warning'
import { UneeqContext } from 'uneeq-react-core'

describe('Warning', () => {
  it('should render warning message', () => {
    const error = 'test warning message'

    const mockContext = {
      config: {
        warningHiddenAfter: 5000
      }
    }
    const Wrapper: React.FC<any> = ({ children }) => {
      return (
        <UneeqContext.Provider value={mockContext}>
          {children}
        </UneeqContext.Provider>
      )
    }
    const { container } = render(<Warning message={error} />, {
      wrapper: Wrapper
    })

    expect(container).toHaveTextContent(error)
  })
})
