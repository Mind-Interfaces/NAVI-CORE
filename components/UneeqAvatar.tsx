import React, { useContext } from 'react'
import UneeqContext from '../provider/UneeqContext.ts'
import { Box } from 'rebass'
import { useUneeqState, useIsSmallScreen } from '../hooks'
import { isMobileSafari } from 'react-device-detect'
// @ts-ignore
import useDimensions from 'react-use-dimensions'

const UneeqAvatar = ({ ...props }) => {
  const { config } = useContext(UneeqContext)
  const { hiddenUI, typeModeFromBackend } = useUneeqState()
  const { setAvatarVideo } = useContext(UneeqContext)
  const isSmallScreen = useIsSmallScreen()

  const [heightRef, { width, height }] = useDimensions()
  let videoWidth = 0
  let shift = 0
  if (width && height && isSmallScreen) {
    videoWidth = height * config.avatarAspect // full width of the video at this height
    const avatarLeft = videoWidth * config.avatarPosition // where the avatar is within video
    const center = width / 2 // the center of the frame - where we want the avatar to be
    shift = Math.min(0, center - avatarLeft) // How far to shift the video over to center
  }

  const setRefs = (ref: React.ReactElement) => {
    setAvatarVideo(ref)
    heightRef(ref)
  }

  return (
    <Box
      {...props}
      sx={{
        label: 'avatar',
        height: '100%',
        width: '100%',
        '& video': {
          minWidth: videoWidth,
          marginLeft: shift,
          mt: hiddenUI
            ? isMobileSafari
              ? typeModeFromBackend
                ? 0
                : width < 768
                ? ['50%', '50%', '50%', '50%', 0, 0]
                : ['30%', '30%', '30%', '30%', 0, 0]
              : 0
            : {}
        }
      }}
      ref={setRefs}
    />
  )
}

export default UneeqAvatar
