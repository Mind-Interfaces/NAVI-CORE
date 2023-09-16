import React, { useEffect } from 'react'

/**
 * dispatch `timeoutUpdate` actions as needed to keep the state updated
 * @param state 
 * @param dispatch 
 * @param timeout 
 * @param timeoutWarning 
 */
const useTimeoutUpdate = (
  state: any,
  dispatch: React.Dispatch<any>,
  timeout: () => void,
  timeoutWarning: number
) => {
  const { ready, sessionEnded, timeLeft, timeoutOpen } = state

  // have we timed out alredy
  if (timeLeft <= 0) {
    timeout()
  }

  useEffect(() => {
    // if session is not ready or has ended we don't need to update timeout
    if (ready && !sessionEnded && timeLeft > 0) {
      // if the timeout is showing we update frequently, otherwise we wait until it should be showing
      const nextUpdate = timeoutOpen ? 200 : timeLeft - timeoutWarning
      const timeout = setTimeout(
        () => dispatch({ type: 'timeoutUpdate' }),
        nextUpdate
      )
      return () => clearTimeout(timeout)
    }
  }, [ready, sessionEnded, timeLeft, timeoutOpen, timeoutWarning, dispatch])

  const resetTimeout = () => dispatch({ type: 'resetTimeout' })
  return { resetTimeout }
}

export default useTimeoutUpdate
