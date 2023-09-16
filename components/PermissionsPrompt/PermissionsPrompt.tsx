import React from 'react'
import { trackEvent } from 'uneeq-react-core'
import Overlay from '../generic/Overlay'

export interface PermissionsVideo {
  permissionsMP4: any
  permissionsWebm: any
}

interface PermissionsPromptProps {
  video: PermissionsVideo
}

const PermissionsPrompt: React.FC<PermissionsPromptProps> = ({ video }) => {
  const { permissionsMP4, permissionsWebm } = video
  trackEvent('permissions-prompt', 'state-change')
  return (
    <Overlay>
      <video
        autoPlay={true}
        loop={true}
        playsInline={true}
        controls={true}
        style={{ width: '903px', height: '524px', objectFit: 'cover' }}
      >
        <source src={permissionsWebm} type="video/webm" />
        <source src={permissionsMP4} type="video/mp4" />
        Loading...
      </video>
    </Overlay>
  )
}

export default PermissionsPrompt
