import React, { useEffect } from 'react'
import { useSupportedBrowser } from '../hooks'
import { Config } from '../uneeq'

/**
 * Try to get users approval for video/audio early. Doing
 * this ourselves means we know when it happens and we
 * can accurately show the "You need to allow..." message
 */
const usePreApprove = (dispatch: React.Dispatch<any>, config: Config) => {
  const { isGteIOS13, isMobileSafari, isSafari } = useSupportedBrowser()
  useEffect(() => {
    if (config.sendLocalAudio || config.sendLocalVideo) {
      navigator.mediaDevices
        .getUserMedia({
          audio: config.sendLocalAudio,
          video: config.sendLocalVideo
        })
        .then(() => dispatch({ type: 'approved' }))
        .catch(() => dispatch({ type: 'declined' }))

      // After calling getUserMedia to request permission we wait a while
      // to see if we get a 'quick' response (already allowed of denied)
      // then we can dispatch the 'approving' action.
      setTimeout(() => dispatch({ type: 'approving' }), 1200)
    } else {
      dispatch({ type: 'approved' })
    }
  }, [
    dispatch,
    isGteIOS13,
    isMobileSafari,
    isSafari,
    config.sendLocalVideo,
    config.sendLocalAudio
  ])
}

export default usePreApprove
