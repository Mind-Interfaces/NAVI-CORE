import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Transcript from '../Transcript'
import { useTranscript, useUneeqState } from 'uneeq-react-core'
jest.mock('uneeq-react-core')
;(useUneeqState as jest.Mock).mockReturnValue({
  transcriptOpen: true
})
;(useTranscript as jest.Mock).mockReturnValue({
  transcript: [],
  downloadTranscript: jest.fn()
})
describe('Transcript', () => {
  it('should render correctly', () => {
    const { container } = render(<Transcript />)

    expect(container).toHaveTextContent('No transcript available yet')
  })
})
