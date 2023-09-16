import React from 'react'
import { waitFor } from '@testing-library/react'
import UneeqLocalVideo from '../UneeqLocalVideo'
import { render } from './../../test-utils'
import UneeqProvider from '../../provider/UneeqProvider'
import { act } from 'react-dom/test-utils'

describe('UneeqLocalVideo', () => {
  it('should return local video', async () => {
    const mockMediaDevices = { getUserMedia: () => Promise.resolve() }
    global.navigator.mediaDevices = mockMediaDevices

    await act(async () => {
      const result = render(
        <UneeqProvider
          config={{}}
          postInit={() => {}}
          onSessionEnded={() => {}}
          onTimedOut={() => {}}
        >
          <UneeqLocalVideo />
        </UneeqProvider>
      )
      await waitFor(() => expect(result).toBeDefined())
    })
  })
})
