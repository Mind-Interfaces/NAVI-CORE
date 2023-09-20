import React, { useContext } from 'react'
import { UneeqContext, useUneeqError } from '../../'
import Error from './Error'
import FatalError from './FatalError'
import Warning from './Warning'

const Errors = () => {
  const error = useUneeqError()
  const { dispatch } = useContext(UneeqContext)
  const clearError = () => dispatch({ type: 'clearError' })

  switch (error?.level) {
    case 'warning':
      return <Warning message={error.message} />
    case 'error':
      return <Error message={error.message} />
    case 'fatal':
      return <FatalError errorMessage={error.message} clearError={clearError} />
    default:
      return null
  }
}

export default Errors
