import React, { useContext } from 'react'
import UneeqContext from '../provider/UneeqContext'

interface UneeqLocalVideoProps {
  style?: React.CSSProperties
}
const UneeqLocalVideo: React.FC<UneeqLocalVideoProps> = ({
  style,
  ...props
}) => {
  const {
    setLocalVideo,
    state: { ready }
  } = useContext(UneeqContext)
  return (
    <div
      {...props}
      style={{ display: !ready ? 'none' : undefined, ...style }}
      ref={setLocalVideo}
    />
  )
}

export default UneeqLocalVideo
