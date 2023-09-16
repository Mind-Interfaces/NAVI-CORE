import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Chat from '../Chat'

describe('Chat', () => {
  it('should render input', () => {
    const { findByLabelText } = render(<Chat />)

    expect(findByLabelText('Chat')).toBeDefined()
  })
})
