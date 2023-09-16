import React from 'react'
import { Box, Text } from 'rebass'
import { trackEvent, trackHandler, useUneeqState } from 'uneeq-react-core'
import Overlay from '../../generic/Overlay'
import EndSessionActions from '../EndSessionActions'
import { useTranslation } from 'react-i18next'

interface EndSessionConfirmProps {
  restart: () => void
}

const EndSessionConfirm: React.FC<EndSessionConfirmProps> = ({ restart }) => {
  const { endConfirmOpen } = useUneeqState()
  const { t } = useTranslation()
  if (!endConfirmOpen) return null

  return (
    <Overlay>
      <Box variant="modal">
        <Text fontSize={5} mb={8}>
          {' '}
          {t('endSession.EndSessionConfirm.heading')}
        </Text>
        <EndSessionActions
          onConfirm={trackHandler(restart, 'end-session-leave-chat-btn')}
          onDismiss={() => trackEvent('end-session-back-to-chat-btn')}
        />
      </Box>
    </Overlay>
  )
}

export default EndSessionConfirm
