import React, { useContext } from 'react'
import { Button, Flex, Text, Box } from 'rebass'
import Overlay from '../generic/Overlay'
import { ReactComponent as WarningIcon } from '../../assets/img/warning-icon.svg'
import s from './styles'
import { Trans, useTranslation } from 'react-i18next'
import { UneeqContext } from 'uneeq-react-core'
const styles = s.avatarUnavailable

interface AvatarUnavailableProps {
  restart: () => void
}
const AvatarUnavailable: React.FC<AvatarUnavailableProps> = ({ restart }) => {
  const { t } = useTranslation()
  const { config } = useContext(UneeqContext)
  return (
    <Overlay>
      <Box variant="modal">
        <Flex sx={styles.icon}>
          <WarningIcon />
        </Flex>
        <Text sx={styles.heading}>
          <Trans
            i18nKey={`Startup.AvatarUnavailable.heading`}
            values={{ avatarName: config.avatarName }}
            t={t}
          >
            Our digital representative is busy
          </Trans>
        </Text>
        <Text sx={styles.message}>
          <Trans
            i18nKey={`Startup.AvatarUnavailable.message`}
            values={{ avatarName: config.avatarName }}
            t={t}
          >
            Sorry, our digital representative is on another call right now.
            Please wait a moment.
          </Trans>
        </Text>
        <Button variant="secondaryInverted" onClick={restart}>
          Back to homepage
        </Button>
      </Box>
    </Overlay>
  )
}

export default AvatarUnavailable
