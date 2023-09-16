import React from 'react'
import { render } from '../../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import EndSessionConfirm from '../EndSessionConfirm'
import { useUneeqState } from 'uneeq-react-core'
jest.mock('uneeq-react-core')

describe('EndSessionConfirm', () => {
  it('should not render when end session is not open', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      endConfirmOpen: false
    })

    const { container } = render(<EndSessionConfirm restart={() => {}} />)

    expect(container).not.toHaveTextContent('Are you sure you want to leave?')
  })

  it('should render when end session is open', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      endConfirmOpen: true
    })

    const { container } = render(<EndSessionConfirm restart={() => {}} />)

    expect(container).toHaveTextContent('Are you sure you want to leave?')
  })

  // TODO
  it.skip('should dismiss correctly', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      endConfirmOpen: true
    })

    const { container, getByText } = render(
      <EndSessionConfirm restart={() => {}} />
    )

    expect(container).toHaveTextContent('Are you sure you want to leave?')

    getByText('Back to chat').click()

    expect(container).not.toHaveTextContent('Are you sure you want to leave?')
  })
})
