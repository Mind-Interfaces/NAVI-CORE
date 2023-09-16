import { renderHook } from '@testing-library/react-hooks'
import useSpacebarToTalk from '../useSpacebarToTalk'
import initialState from '../state/initialState'
import defaultConfig from '../defaultConfig'

const document = window.document

const mockUneeqCurrent = {
  startRecording: jest.fn(),
  stopRecording: jest.fn()
}
const mockState = {
  ...initialState(defaultConfig),
  avatarSpeaking: false,
  feedbackOpen: false,
  escalationFormOpen: false,
  ready: true
}

describe('useSpacebarToTalk', () => {
  it('should add/remove event listeners when mounting/unmounting the hook', async () => {
    const adder = jest.spyOn(document, 'addEventListener')
    const remover = jest.spyOn(document, 'removeEventListener')

    const renderedHook = renderHook(() =>
      useSpacebarToTalk(mockState, mockUneeqCurrent)
    )
    expect(adder).toHaveBeenCalled()

    renderedHook.unmount()
    expect(remover).toHaveBeenCalled()
  })

  it('should call start/stop recording functions when pressing spacebar key', async () => {
    mockUneeqCurrent.startRecording.mockReset()
    mockUneeqCurrent.stopRecording.mockReset()
    renderHook(() => useSpacebarToTalk(mockState, mockUneeqCurrent))

    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }))
    expect(mockUneeqCurrent.startRecording).toHaveBeenCalled()

    document.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }))
    expect(mockUneeqCurrent.stopRecording).toHaveBeenCalled()
  })
  it('should not call start/stop recording functions if feedback or escalation form is open', async () => {
    mockUneeqCurrent.startRecording.mockReset()
    renderHook(() =>
      useSpacebarToTalk(
        { ...mockState, escalationFormOpen: true },
        mockUneeqCurrent
      )
    )

    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }))
    expect(mockUneeqCurrent.startRecording).not.toHaveBeenCalled()
  })
})
