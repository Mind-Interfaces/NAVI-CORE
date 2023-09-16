import React, { useContext } from 'react'
// @ts-ignore
import { Progress } from 'react-sweet-progress'
import 'react-sweet-progress/lib/style.css'
import { Button, Flex, Heading, Text, Box } from 'rebass'
import { trackHandler, UneeqContext, useTimeout } from 'uneeq-react-core'
import Overlay from '../generic/Overlay'
import styles from './styles'
import { useTheme } from 'emotion-theming'
import { useTranslation } from 'react-i18next'

const Timeout = () => {
  const theme: any = useTheme()
  const {
    config: { timeoutWarning }
  } = useContext(UneeqContext)
  const { timeoutOpen, timeLeft, resetTimeout, endSession } = useTimeout()
  const { t } = useTranslation()

  if (!timeoutOpen) return null

  const seconds = Math.max(Math.ceil(timeLeft / 1000), 0)
  const progress = (timeLeft / timeoutWarning) * 100

  return (
    <Overlay>
      <Box variant="modal">
        <Heading sx={styles.heading}>{t('Timeout.heading')}</Heading>
        <Text sx={styles.text}>{t('Timeout.subtitle')}</Text>
        <Flex sx={styles.progress}>
          <Text sx={styles.time}>{seconds}s</Text>
          <Progress
            percent={progress}
            theme={{
              active: {
                trailColor: theme.colors.timeoutColor,
                color: theme.colors.timeoutTrailColor
              }
            }}
          />
        </Flex>
        <Flex sx={styles.buttonsContainer}>
          <Button
            variant="secondaryInverted"
            sx={styles.leaveChatButton}
            onClick={trackHandler(endSession, 'timeout-finished-btn')}
          >
            {t('Timeout.leaveChat')}
          </Button>
          <Button
            variant="secondary"
            sx={styles.backToChatButton}
            onClick={trackHandler(resetTimeout, 'timeout-continue-session-btn')}
          >
            {t('Timeout.backToChat')}
          </Button>
        </Flex>
      </Box>
    </Overlay>
  )
}

export default Timeout
