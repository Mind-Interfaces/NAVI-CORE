import React, { useContext } from 'react'
import { Text, Button } from 'rebass'
import { trackHandler, UneeqContext, useUneeqState } from 'uneeq-react-core'
import { ReactComponent as LeaveChatIcon } from '../../../assets/img/leave-chat-icon.svg'
import styles from './styles'
import { useTranslation } from 'react-i18next'

const EndSessionButton = () => {
  const { dispatch, config } = useContext(UneeqContext)
  const { feedbackGiven, contactDetailsGiven } = useUneeqState()
  const { t } = useTranslation()

  const endSession = () => {
    let nextStep
    if (!feedbackGiven) {
      nextStep = 'Feedback'
    } else if (!contactDetailsGiven && config.showEscalationForm) {
      nextStep = 'EscalationForm'
    } else {
      nextStep = 'EndConfirm'
    }
    dispatch({ type: 'open' + nextStep, payload: true })
  }

  return (
    <Button
      sx={styles.button}
      variant="primaryInverted"
      onClick={trackHandler(endSession, 'exit-session-btn')}
    >
      <LeaveChatIcon />
      <Text as="span" sx={styles.text}>
        {t('endSession.EndSessionButton.leaveChat')}
      </Text>
    </Button>
  )
}

export default EndSessionButton
