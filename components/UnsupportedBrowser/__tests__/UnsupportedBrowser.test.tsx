import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import UnsupportedBrowser from '../UnsupportedBrowser'

describe('UnsupportedBrowser', () => {
  it('should render', () => {
    const { findByLabelText } = render(<UnsupportedBrowser />)

    expect(
      findByLabelText(
        'We support Chrome on both Windows 10 and MacOS (High Sierra or later)'
      )
    ).toBeDefined()
  })
})
