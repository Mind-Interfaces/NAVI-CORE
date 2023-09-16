import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import SavedItems from '../SavedItems'
import { useUneeqState } from 'uneeq-react-core'
jest.mock('uneeq-react-core')

describe('SavedItems', () => {
  it('should render correctly', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      savedItems: [
        {
          information: `# Heading`
        }
      ]
    })
    const { container } = render(<SavedItems />)

    expect(container).toHaveTextContent('Saved (1)')
  })

  it('should not render when there are no saved items', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      savedItems: []
    })
    const { container } = render(<SavedItems />)

    expect(container).toBeEmptyDOMElement()
  })
})
