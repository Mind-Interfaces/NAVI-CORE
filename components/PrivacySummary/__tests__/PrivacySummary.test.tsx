import React, { useContext } from 'react'
import { render, fireEvent } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import PrivacySummary from '../PrivacySummary'
import { useUneeqState, UneeqContext } from 'uneeq-react-core'
import { act, renderHook } from '@testing-library/react-hooks'
jest.mock('uneeq-react-core')

describe('PrivacySummary', () => {
  it('should render correctly', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      privacyOpen: true
    })
    const { container } = render(<PrivacySummary />)

    expect(container).toHaveTextContent('We take your privacy seriously')
  })

  it('should not render when privacy hidden', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      privacyOpen: false
    })
    const { container } = render(<PrivacySummary />)

    expect(container).toBeEmptyDOMElement()
  })

  it.skip('should allow closing', async () => {
    // ;(useUneeqState as jest.Mock).mockReturnValue({
    //   privacyOpen: true
    // })
    await act(async () => {
      const { container, getByTestId, debug } = render(<PrivacySummary />)
      const { result, waitForNextUpdate, unmount } = renderHook(() =>
        useContext(UneeqContext)
      )
      await waitForNextUpdate()
      result.current.dispatch({ type: 'openPrivacy', payload: true })
      fireEvent.click(getByTestId('privacy-summary-close'))
      debug()
      expect(container).toBeEmptyDOMElement()
    })
  })
})
