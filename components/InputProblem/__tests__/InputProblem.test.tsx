import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import InputProblem from '../InputProblem'
import translation from '../../../translations/en.json'

describe('InputProblem', () => {
  it('should render noInput error', () => {
    const { container } = render(<InputProblem error="noInput" />)

    expect(container).toHaveTextContent('Please check your')
  })

  it('should render spacebarTapped error', () => {
    const { container } = render(<InputProblem error="spacebarTapped" />)

    expect(container).toHaveTextContent(
      translation.InputProblem.spacebarSmallScreen
    )
  })
})
