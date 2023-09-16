import React from 'react'
import { contextMock, render } from '../../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Feedback from '../Feedback'
import { fireEvent } from '@testing-library/react'
import translation from '../../../../translations/en.json'
import * as core from 'uneeq-react-core'
jest.spyOn(core, 'useUneeqState')
core.useUneeqState.mockImplementation(() => ({ feedbackOpen: true }))

describe('Feedback', () => {
  it('should render correctly', () => {
    const { container } = render(<Feedback restart={() => {}} />)

    expect(container).toHaveTextContent('How likely are you to recommend')
  })

  it('should Leave Chat correctly', () => {
    const restart = jest.fn()
    const { getByText } = render(<Feedback restart={restart} />, {
      state: { feedbackOpen: true }
    })

    fireEvent.click(
      getByText(translation.endSession.EndSessionActions.leaveChat)
    )

    expect(restart).toHaveBeenCalled()
  })

  it('should Leave Chat correctly when contact details given', () => {
    const restart = jest.fn()

    const { getByText } = render(<Feedback restart={restart} />, {
      state: { feedbackOpen: true, contactDetailsGiven: true }
    })
    fireEvent.click(
      getByText(translation.endSession.EndSessionActions.leaveChat)
    )

    expect(restart).toHaveBeenCalled()
  })

  it('should Leave Chat correctly after setting score and text', () => {
    const restart = jest.fn()

    const { getByText, getByTestId } = render(<Feedback restart={restart} />, {
      state: { feedbackOpen: true, contactDetailsGiven: true }
    })
    const textarea = getByTestId('comment-textarea')

    fireEvent.click(getByTestId('recomm-5'))
    fireEvent.click(getByTestId('easy-8'))
    fireEvent.change(textarea, { target: { value: 'some feedback text' } })
    fireEvent.click(
      getByText(translation.endSession.EndSessionActions.leaveChat)
    )

    expect(restart).toHaveBeenCalled()
  })

  it('should Leave Chat correctly after setting score and text with showEscalationForm', () => {
    const restart = jest.fn()

    const { getByText, getByTestId } = render(<Feedback restart={restart} />, {
      state: { feedbackOpen: true, contactDetailsGiven: false },
      context: {
        config: { showEscalationForm: true }
      }
    })
    const textarea = getByTestId('comment-textarea')

    fireEvent.click(getByTestId('recomm-5'))
    fireEvent.click(getByTestId('easy-8'))
    fireEvent.change(textarea, { target: { value: 'some feedback text' } })
    fireEvent.click(
      getByText(translation.endSession.EndSessionActions.leaveChat)
    )

    expect(contextMock.dispatch).toHaveBeenCalled()
  })

  it('should Leave Chat correctly after setting score and text with showEscalationForm', () => {
    const restart = jest.fn()
    core.useUneeqState.mockImplementation(() => ({
      feedbackOpen: true,
      contactDetailsGiven: true
    }))

    const { getByText, getByTestId } = render(<Feedback restart={restart} />, {
      context: {
        config: { showEscalationForm: true }
      }
    })
    const textarea = getByTestId('comment-textarea')

    fireEvent.click(getByTestId('recomm-5'))
    fireEvent.click(getByTestId('easy-8'))
    fireEvent.change(textarea, { target: { value: 'some feedback text' } })
    fireEvent.click(
      getByText(translation.endSession.EndSessionActions.leaveChat)
    )

    expect(restart).toHaveBeenCalled()
  })
})
