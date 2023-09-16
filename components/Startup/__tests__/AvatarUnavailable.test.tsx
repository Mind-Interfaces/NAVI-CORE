import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import AvatarUnavailable from '../AvatarUnavailable'

describe('AvatarUnavailable', () => {
  it('should render', () => {
    const { findByLabelText } = render(<AvatarUnavailable />)

    expect(findByLabelText('a Digital Human is busy')).toBeDefined()
  })
})
