import React from 'react'
import { fireEvent, render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Menu from '../Menu'
import { useUneeqState } from 'uneeq-react-core'
jest.mock('uneeq-react-core')

describe('Menu', () => {
  it('should render correctly', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      menuOpen: true
    })
    const { container } = render(<Menu />)

    expect(container).toHaveTextContent('Settings')
  })
  it('should stop rendering when closed', async () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      menuOpen: true
    })
    const { getByTestId, container, rerender } = render(<Menu />)
    expect(container).toHaveTextContent('Settings')
    fireEvent.click(getByTestId('menu-icon'))
    ;(useUneeqState as jest.Mock).mockReturnValue({
      menuOpen: false
    })
    rerender(<Menu />)
    expect(container).not.toHaveTextContent('Settings')
  })
})
