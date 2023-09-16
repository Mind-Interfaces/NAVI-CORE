import React from 'react'
import UneeqAvatar from '../UneeqAvatar'
import { render } from '../../test-utils'
import { useUneeqState } from '../../hooks'
jest.mock('../../hooks')

describe('UneeqAvatar', () => {
  it('should return avatar', async () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      hiddenUI: false
    })
    const result = render(<UneeqAvatar />)
    expect(result).toBeDefined()
  })
})
