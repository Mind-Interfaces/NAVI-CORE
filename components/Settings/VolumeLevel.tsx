import React from 'react'
import { Box, Flex } from 'rebass'
import { useVolume } from 'uneeq-react-core'
import styles from './styles'

export const VolumeLevel = () => {
  const volume = useVolume(true)
  return (
    <Flex sx={styles.volume.graph}>
      <Box sx={{ ...styles.volume.shortBar, height: `${0.07 * volume}px` }} />
      <Box sx={{ ...styles.volume.longBar, height: `${0.2 * volume}px` }} />
      <Box sx={{ ...styles.volume.shortBar, height: `${0.07 * volume}px` }} />
    </Flex>
  )
}
export default VolumeLevel
