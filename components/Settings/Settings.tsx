import React, { useContext, useRef } from 'react'
import { Button, Flex, Text, Box } from 'rebass'
import { trackHandler, UneeqContext, useUneeqState } from 'uneeq-react-core'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import Overlay from '../generic/Overlay'
import AudioTest from './AudioTest'
import Devices from './DeviceList'
import styles from './styles'
import VolumeLevel from './VolumeLevel'
import { useTranslation } from 'react-i18next'

interface SettingsProps {
  audio: any
}

const Settings: React.FC<SettingsProps> = ({ audio }) => {
  const { dispatch } = useContext(UneeqContext)
  const modalRef = useRef()
  const { settingsOpen } = useUneeqState()
  const { t } = useTranslation()

  const close = () => {
    if (settingsOpen) {
      dispatch({ type: 'closeModal' })
    }
  }

  useOnClickOutside(modalRef, close)

  if (!settingsOpen) return null

  return (
    <Overlay>
      <Box variant="modal" sx={styles.modal} ref={modalRef}>
        <Text variant="heading">{t('Settings.Settings.heading')}</Text>
        <Flex sx={styles.contentWrapper}>
          <Flex sx={styles.content}>
            <Devices deviceType={'audioInput'} />
            <VolumeLevel />
          </Flex>
          <Flex sx={styles.content}>
            <Devices deviceType={'audioOutput'} />
            <AudioTest audio={audio} />
          </Flex>
        </Flex>
        <Button
          my={4}
          variant="secondary"
          sx={styles.closeButton}
          onClick={trackHandler(close, 'settings-close-btn')}
        >
          {t('Settings.Settings.closeButton')}
        </Button>
      </Box>
    </Overlay>
  )
}
export default Settings
