import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import BottomBar from '../BottomBar'
import { useUneeqState, useUneeqSpaceToTalk } from 'uneeq-react-core'
import { render as customRender } from '../../../test-utils'

jest.mock('uneeq-react-core')
;(useUneeqSpaceToTalk as jest.Mock).mockReturnValue({
  recording: false,
  sending: false,
  startRecording: jest.fn(),
  stopRecording: jest.fn()
})
;(useUneeqState as jest.Mock).mockReturnValue({
  inputMode: 'talk',
  transcriptOpen: false,
  transcriptHasOpened: false,
  onScreenInfo: [],
  spacebarTapped: false,
  noInput: false,
  menuOpen: false,
  question: null,
  avatarSpeaking: false,
  savedItems: []
})

describe('BottomBar', () => {
  it('should render', () => {
    const { container } = customRender(<BottomBar />)
    expect(container).not.toBeEmptyDOMElement()
  })
})
