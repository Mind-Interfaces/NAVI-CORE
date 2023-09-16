import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import UserQuestion from '../UserQuestion'
import { contextMock, render } from '../../../../test-utils'

describe('UserQuestion', () => {
  it('should render question', () => {
    contextMock.dispatch.mockClear()
    const testQuestion = 'test'
    const { container } = render(<UserQuestion>{testQuestion}</UserQuestion>)
    expect(container).toHaveTextContent(testQuestion)
  })

  it('should not render when it has no children', () => {
    contextMock.dispatch.mockClear()
    const testQuestion = undefined
    const { container } = render(<UserQuestion>{testQuestion}</UserQuestion>)
    expect(container).toBeEmptyDOMElement()
  })
})
