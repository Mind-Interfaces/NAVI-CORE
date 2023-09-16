import React from 'react'
import { Flex, SxStyleProp } from 'rebass'
import { useLocalVideo } from 'uneeq-react-core'

interface LocalVideoProps {
  sx?: SxStyleProp
}
const LocalVideo: React.FC<LocalVideoProps> = ({ sx }) => {
  const ref = useLocalVideo()
  return <Flex ref={ref} sx={{ ...sx }} />
}

export default LocalVideo
