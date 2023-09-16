import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import TranscriptHeader from '../TranscriptHeader'

describe('TranscriptHeader', () => {
  it('should render', () => {
    const { findByLabelText } = render(<TranscriptHeader />)

    expect(findByLabelText('Minimize Transcript')).toBeDefined()
  })
})
