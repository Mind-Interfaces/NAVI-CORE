import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import SuggestedResponses from '../SuggestedResponses'
import { useUneeqState } from 'uneeq-react-core'
jest.mock('uneeq-react-core')
const suggestedResponses = {
  mainTitle: 'Call to action text: ',
  suggestedResponses: [
    {
      label: 'Suggested Response #1',
      utterance: 'suggested response 1'
    },
    {
      label: 'Suggested Response #2',
      utterance: 'suggested response 2'
    },
    {
      label: 'Suggested Response #3',
      utterance: 'suggested response 3'
    }
  ]
}
;(useUneeqState as jest.Mock).mockReturnValue({
  savedItems: [],
  onScreenInfo: {
    suggestedResponses
  }
})

describe('SuggestedResponses', () => {
  it('should render correctly', () => {
    const { container } = render(
      <SuggestedResponses suggestedResponses={suggestedResponses} />
    )

    expect(container).toHaveTextContent('Suggested Response #1')
  })
})
