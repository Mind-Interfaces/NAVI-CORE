import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import PasscodeOverlay from '../PasscodeOverlay'

describe('PasscodeOverlay', () => {
  it('should render', async () => {
    const config = {
      tokenUrl: '123'
    }

    const { findByLabelText } = render(
      <PasscodeOverlay close={() => {}} start={() => {}} config={config} />
    )

    const label = await findByLabelText('Enter your 7-digit passcode')

    expect(label).toBeInTheDocument()
  })
})
