import { fireEvent, getByText } from '@testing-library/react'
import React from 'react'
import { contextMock, render } from '../../../../test-utils'
import EndSessionButton from '../EndSessionButton'

describe('EndSessionButton', () => {
  it('should render correctly', () => {
    const { container } = render(<EndSessionButton />)

    expect(container).toHaveTextContent('Leave Chat')
  })

  it('should open Feedback on click', async () => {
    const { container } = render(<EndSessionButton />)
    fireEvent.click(getByText(container, 'Leave Chat'))
    expect(contextMock.dispatch).toBeCalledWith({
      type: 'openFeedback',
      payload: true
    })
  })

  it('should open EscalationForm on click if feedback given', async () => {
    contextMock.dispatch.mockClear()

    const { container } = render(<EndSessionButton />, {
      state: { feedbackGiven: true }
    })
    fireEvent.click(getByText(container, 'Leave Chat'))
    expect(contextMock.dispatch).toBeCalledWith({
      type: 'openEscalationForm',
      payload: true
    })
  })

  it('should open EndConfirm on click if feedback given', async () => {
    contextMock.dispatch.mockClear()

    const { container } = render(<EndSessionButton />, {
      state: { feedbackGiven: true, contactDetailsGiven: true }
    })
    fireEvent.click(getByText(container, 'Leave Chat'))
    expect(contextMock.dispatch).toBeCalledWith({
      type: 'openEndConfirm',
      payload: true
    })
  })
})
