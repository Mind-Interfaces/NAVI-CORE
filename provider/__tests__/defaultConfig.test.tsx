import UneeqProvider from '../UneeqProvider'
import { renderHook, act } from '@testing-library/react-hooks'
import React, { useContext } from 'react'
import UneeqContext from '../UneeqContext'
import defaultConfig from '../defaultConfig'

describe('Config', () => {
  it('should return the default config when providing an empty config', async () => {
    const mockMediaDevices = { getUserMedia: () => Promise.resolve() }
    global.navigator.mediaDevices = mockMediaDevices

    await act(async () => {
      const config = {}
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
      const { result, waitForNextUpdate } = renderHook(
        () => useContext(UneeqContext),
        { wrapper }
      )
      await waitForNextUpdate()
      expect(result.current.config).toEqual(defaultConfig)
    })
  })

  it('should override the default config correctly', async () => {
    const mockMediaDevices = { getUserMedia: () => Promise.resolve() }
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
      const { result, waitForNextUpdate } = renderHook(
        () => useContext(UneeqContext),
        { wrapper }
      )
      await waitForNextUpdate()
      expect(result.current.config).toEqual({ ...defaultConfig, ...config })
    })
  })
})
