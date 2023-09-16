import React from 'react'
import { Flex, SxStyleProp } from 'rebass'

interface OverlayProps {
  transparent?: boolean,
  children: React.ReactNode,
  sx?: SxStyleProp
}
const Overlay: React.FC<OverlayProps> = ({ children, sx, transparent = false }) => {
  return (
    <Flex
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        backgroundColor: !transparent ? 'rgba(0,0,0,0.7)' : undefined,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...sx
      }}
    >
      {children}
    </Flex>
  )
}

export default Overlay
