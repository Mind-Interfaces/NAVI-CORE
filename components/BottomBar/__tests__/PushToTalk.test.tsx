import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import PushToTalk from '../PushToTalk'
import { render } from '../../../test-utils'
import translation from '../../../translations/en.json'

describe('PushToTalk', () => {
  it('should render input', () => {
    const { container } = render(
      <PushToTalk recording={false} sending={false} />
    )

    expect(container).toHaveTextContent(
      translation.BottomBar.PushToTalk.waiting
    )
  })
})
