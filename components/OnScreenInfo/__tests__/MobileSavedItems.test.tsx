import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import MobileSavedItems from '../MobileSavedItems'
import * as core from 'uneeq-react-core'
jest.spyOn(core, 'useUneeqState')

describe('MobileSavedItems', () => {
  it('should render correctly', () => {
    core.useUneeqState.mockImplementation(() => ({
      savedItems: [
        {
          information: `# Heading`
        }
      ]
    }))
    const { container } = render(<MobileSavedItems />)

    expect(container).toHaveTextContent('heart-full.svg')
  })

  it('should not render when there are no saved items', () => {
    core.useUneeqState.mockImplementation(() => ({
      savedItems: []
    }))
    const { container } = render(<MobileSavedItems />)

    expect(container).toBeEmptyDOMElement()
  })
})
