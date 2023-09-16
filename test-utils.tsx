import React from 'react'
import { render } from '@testing-library/react'
import UneeqContext from './provider/UneeqContext'
import { ThemeProvider } from 'emotion-theming'

export const contextMock = {
  dispatch: jest.fn(),
  allDialogsClosed: jest.fn().mockReturnValue(true),
  config: {
    timeoutWarning: 180000
  },
  sendText: jest.fn(),
  state: {
    feedbackGiven: false,
    contactDetailsGiven: false
  },
  setAvatarVideo: jest.fn()
}

export const themeMock = {
  colors: {
    timeoutColor: '#000000',
    timeoutTrailColor: '#000000'
  },
  breakpoints: ['320px', '600px', '768px', '1024px', '1280px']
}

const providers = (state: any = contextMock.state, context: any) => ({
  children
}: any) => {
  return (
    <ThemeProvider theme={themeMock}>
      <UneeqContext.Provider
        value={{
          ...contextMock,
          state,
          ...context
        }}
      >
        {children}
      </UneeqContext.Provider>
    </ThemeProvider>
  )
}

const customRender = (ui: any, options: any = {}) => {
  const { state, context, ...renderOptions } = options
  return render(ui, { wrapper: providers(state, context), ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

export const renderIgnoringUnstableFlushDiscreteUpdates = (component: any) => {
  /* eslint-disable no-console */
  const originalError = console.error
  const error = jest.fn()
  console.error = error
  const result = render(component)
  expect(error).toHaveBeenCalledTimes(1)
  expect(error).toHaveBeenCalledWith(
    'Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.%s',
    expect.any(String)
  )
  console.error = originalError
  /* eslint-enable no-console */
  return result
}

export const renderIgnoreRenderErrors = (component: any) => {
  /* eslint-disable no-console */
  const originalError = console.error
  const error = jest.fn()
  console.error = error
  const result = render(component)
  expect(error).toHaveBeenCalled()
  console.error = originalError
  /* eslint-enable no-console */
  return result
}
