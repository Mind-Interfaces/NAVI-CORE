import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import PermissionsRejected from '../PermissionsRejected'
import * as core from 'uneeq-react-core'
import { useUneeqState, trackEvent } from 'uneeq-react-core'
jest.mock('uneeq-react-core')
;(useUneeqState as jest.Mock).mockReturnValue({
  privacyOpen: true
})
jest.spyOn(core, 'trackEvent')

describe('PermissionsRejected', () => {
  it('should render correctly', () => {
    const { container } = render(<PermissionsRejected restart={() => {}} />)

    expect(container).toHaveTextContent(
      "Looks like you've declined permissions"
    )
  })
  it('should go home when clicking Back to Home button', () => {
    const restart = jest.fn()
    const { getByTestId } = render(<PermissionsRejected restart={restart} />)

    getByTestId('backButton').click()

    expect(restart).toHaveBeenCalled()
    expect(core.trackEvent).toHaveBeenCalledWith(
      'permissions-rejected-homepage-btn'
    )
  })
  it('should reload when clicking Reload button', () => {
    const { location } = window
    const restart = jest.fn()
    delete window.location
    // @ts-ignore
    window.location = { reload: jest.fn() }
    const { getByTestId } = render(<PermissionsRejected restart={restart} />)

    getByTestId('reload').click()

    expect(window.location.reload).toHaveBeenCalled()
    expect(core.trackEvent).toHaveBeenCalledWith(
      'permissions-rejected-reload-btn'
    )
    window.location = location
  })
})
