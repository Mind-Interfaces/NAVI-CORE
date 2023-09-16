import React from 'react'
import {
  getErrorLevel,
  useAvatarVolume,
  useLocalVideo,
  useVolume
} from '../hooks'
import defaultConfig from '../provider/defaultConfig'
import { renderHook } from '@testing-library/react-hooks'
import UneeqContext from '../provider/UneeqContext'

const mockConfig = {
  ...defaultConfig,
  url: '',
  conversationId: '',
  tokenUrl: ''
}

describe('getErrorLevel', () => {
  it('should return "fatal" level for code ErrorEndingSession', () => {
    const errorLevel = getErrorLevel(mockConfig, 'ErrorEndingSession')
    expect(errorLevel).toBe('fatal')
  })

  it('should return "error" level for code DeviceError', () => {
    const errorLevel = getErrorLevel(mockConfig, 'DeviceError')
    expect(errorLevel).toBe('error')
  })

  it('should return "ignore" level for error code 11002', () => {
    const errorLevel = getErrorLevel(mockConfig, 11002)
    expect(errorLevel).toBe('ignore')
  })
  it('should return "warning" level for code AvatarUnavailable', () => {
    const errorLevel = getErrorLevel(mockConfig, 'AvatarUnavailable')
    expect(errorLevel).toBe('warning')
  })
})

describe('useAvatarVolume', () => {
  it('should start with volume 1', () => {
    // TODO: change after UneeqProvider works
    const mockContext = { volume: { watch: () => {}, set: () => {} } }
    const Wrapper: React.FC<any> = ({ children }) => {
      return (
        <UneeqContext.Provider value={mockContext}>
          {children}
        </UneeqContext.Provider>
      )
    }
    const {
      result: {
        current: [volume, set]
      }
    } = renderHook(() => useAvatarVolume(), { wrapper: Wrapper })
    expect(volume).toBe(1)
  })
})

describe('useLocalVideo', () => {
  it('should return reference defined', () => {
    const mockLocalVideo = {
      children: ['mockLocalVideo'],
      appendChild: jest.fn()
    }
    const mockContext = { localVideo: mockLocalVideo }
    const Wrapper: React.FC<any> = ({ children }) => {
      return (
        <UneeqContext.Provider value={mockContext}>
          {children}
        </UneeqContext.Provider>
      )
    }
    const mockTargetElement = { appendChild: jest.fn() }
    const { unmount } = renderHook(
      () => {
        const ref = useLocalVideo()
        ref.current = mockTargetElement
        return null
      },
      { wrapper: Wrapper }
    )

    // test that video is put into container
    expect(mockTargetElement.appendChild).toBeCalledWith('mockLocalVideo')

    // Test that the video is put back on unmount
    unmount()
    expect(mockLocalVideo.appendChild).toBeCalledWith('mockLocalVideo')
  })
})

describe('useVolume', () => {
  it('should return volume defined', async () => {
    const volume = renderHook(() => useVolume())

    expect(volume).toBeDefined()
  })
})
