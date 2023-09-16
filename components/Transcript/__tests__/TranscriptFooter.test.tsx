import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import TranscriptFooter from '../TranscriptFooter'

describe('TranscriptFooter', () => {
  it('should render input', () => {
    const { findByLabelText } = render(
      <TranscriptFooter setHasText={() => {}} />
    )

    expect(findByLabelText('Question')).toBeDefined()
  })

  it('should send text', async () => {
    const { getByTestId } = render(<TranscriptFooter setHasText={() => {}} />)
    await userEvent.type(getByTestId('questionInput'), 'Hello, World!')
    expect(getByTestId('questionInput')).toHaveValue('Hello, World!')
    await userEvent.click(getByTestId('transcriptSendBtn'))
    expect(getByTestId('questionInput')).toHaveValue('')
  })
})
