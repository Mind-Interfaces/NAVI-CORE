import React from 'react'
import { contextMock, render } from '../../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import EscalationForm from '../EscalationForm'
import { fireEvent } from '@testing-library/react'
import translation from '../../../../translations/en.json'
import * as core from 'uneeq-react-core'
jest.spyOn(core, 'useUneeqState')

describe('EscalationForm', () => {
  it('should leave chat correctly when from server', () => {
    const restart = jest.fn()
    core.useUneeqState.mockImplementation(() => ({
      escalationFormOpen: true,
      escalationFormFromServer: true,
      feedbackGiven: false
    }))

    const { getByText, getByTestId } = render(
      <EscalationForm restart={restart} />,
      {
        context: {
          config: { showEscalationForm: true }
        }
      }
    )
    const email = getByTestId('escalation-email')
    fireEvent.change(email, { target: { value: 'test@test.com' } })
    fireEvent.click(
      getByText(translation.endSession.EndSessionActions.leaveChat)
    )

    expect(contextMock.dispatch).toHaveBeenCalledWith({
      type: 'openFeedback',
      payload: true
    })
  })
})
