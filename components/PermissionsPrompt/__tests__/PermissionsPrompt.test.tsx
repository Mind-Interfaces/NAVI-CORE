import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import PermissionsPrompt from '../PermissionsPrompt'

describe('PermissionsPrompt', () => {
  it('should render correctly', () => {
    const video = { permissionsMP4: {}, permissionsWebm: {} }

    const { container } = render(<PermissionsPrompt video={video} />)

    expect(container).toHaveTextContent('Loading')
  })
})
