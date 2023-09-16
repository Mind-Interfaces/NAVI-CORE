import React from 'react'
import { contextMock, render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import MobileInformationButton from '../MobileInformationButton'
import * as core from 'uneeq-react-core'
import { fireEvent } from '@testing-library/react'
jest.spyOn(core, 'useUneeqState')

describe('MobileInformationButton', () => {
  it('should render correctly', () => {
    core.useUneeqState.mockImplementation(() => ({
      onScreenInfo: {
        information: `# Heading`
      }
    }))
    const { container } = render(<MobileInformationButton />)

    expect(container).toHaveTextContent('information-button.svg')
  })

  it('should not render when there are no saved items', () => {
    core.useUneeqState.mockImplementation(() => ({
      onScreenInfo: {}
    }))
    const { container } = render(<MobileInformationButton />)

    expect(container).toBeEmptyDOMElement()
  })

  it('should expand when clicking button', () => {
    core.useUneeqState.mockImplementation(() => ({
      onScreenInfo: {
        information: `# Heading`
      }
    }))
    const { getByTestId } = render(<MobileInformationButton />)
    const button = getByTestId('mobileInfoButton')
    fireEvent.click(button)
    expect(contextMock.dispatch).toHaveBeenCalledWith({
      type: 'openMobileInformation',
      payload: true
    })
  })
})
