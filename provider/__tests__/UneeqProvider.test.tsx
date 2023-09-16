import UneeqProvider from '../UneeqProvider'
import { renderHook, act } from '@testing-library/react-hooks'
import React, { useContext } from 'react'
import UneeqContext from '../UneeqContext'
import defaultConfig from '../defaultConfig'

describe('UneeqProvider', () => {
  it('should ????????????????????', async () => {
    const mockMediaDevices = { getUserMedia: () => Promise.resolve() }
    // @ts-ignore
    global.navigator.mediaDevices = mockMediaDevices

    await act(async () => {
      const config = {
        timeoutWarning: 90 * 1000,
        avatarName: 'CustomAvatarName'
      }
      const wrapper = ({ children }: any) => (
        <UneeqProvider
          config={config}
          postInit={() => {}}
          onSessionEnded={() => {}}
          onTimedOut={() => {}}
        >
          {children}
        </UneeqProvider>
      )
      const { result, waitForNextUpdate, unmount } = renderHook(
        () => useContext(UneeqContext),
        { wrapper }
      )
      await waitForNextUpdate()
      // open feedback
      expect(result.current.state.feedbackOpen).toBe(false)
      result.current.dispatch({ type: 'openFeedback', payload: true })
      expect(result.current.state.feedbackOpen).toBe(true)

      // close modal
      result.current.hideModal()
      expect(result.current.state.feedbackOpen).toBe(false)

      // all dialogs closed
      expect(result.current.allDialogsClosed()).toBe(true)

      // open transcript
      expect(result.current.state.transcriptOpen).toBe(false)
      result.current.dispatch({ type: 'openTranscript', payload: true })
      expect(result.current.state.transcriptOpen).toBe(true)

      // testMessage
      const errorMessage = {
        errorCode: 5015,
        message: 'Fake Fatal Error 5015'
      }
      result.current.testMessage({
        uneeqMessageType: 'SessionError',
        error: JSON.stringify(errorMessage)
      })

      expect(result.current.state.error).toEqual(errorMessage)

      // volume
      // result.current.setLocalVideo({ children: [{ volume: 1 }] })
      // await waitForNextUpdate()
      // result.current.setAvatarVideo({ children: [{ volume: 2 }] })
      // await waitForNextUpdate()
      // result.current.volume.set(50)
      // console.log('result.current.volume', result.current.volume)
      // expect(result.current.localVideo.volume).toBe(50)
      // console.log('result.current', result.current)

      expect(result.current.config).toEqual({ ...defaultConfig, ...config })
      // unmount()
    })
  })
})
