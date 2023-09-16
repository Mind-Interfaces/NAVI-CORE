import { Input, Label, Radio } from '@rebass/forms'
import React, { useContext, useEffect, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import { trackHandler, UneeqContext, useUneeqState } from 'uneeq-react-core'
import { isEmailValid } from '../../../utils/utils'
import Overlay from '../../generic/Overlay'
import EndSessionActions from '../EndSessionActions'
import styles from './styles'
import { useTranslation } from 'react-i18next'

interface EscalationFormProps {
  restart: () => void
}
const EscalationForm: React.FC<EscalationFormProps> = ({ restart }) => {
  const [email, setEmail] = useState('')
  const {
    escalationFormOpen,
    escalationFormFromServer,
    feedbackGiven
  } = useUneeqState()
  const { t } = useTranslation()

  const [shouldContact, setShouldContact] = useState<boolean | null>(
    escalationFormFromServer === true ? true : null
  )
  useEffect(() => {
    if (escalationFormFromServer) {
      setShouldContact(true)
    }
  }, [escalationFormFromServer])

  const { dispatch, sendData } = useContext(UneeqContext)

  if (!escalationFormOpen) return null

  const validEmail = isEmailValid(email)
  const errorInEmail = email && !validEmail

  const submit = () => {
    if (shouldContact) {
      sendData({ email })
      console.info('Email sent', { email })
      dispatch({ type: 'giveContactDetails' })
    }
  }
  const leaveChat = () => {
    submit()
    if (!feedbackGiven) {
      dispatch({ type: 'openFeedback', payload: true })
    } else {
      restart()
    }
  }

  return (
    <Overlay>
      <Box variant="modal" sx={styles.modal}>
        <Text sx={styles.heading}>
          {escalationFormFromServer
            ? t('endSession.EscalationForm.headingRefer')
            : feedbackGiven
            ? t('endSession.EscalationForm.headingThanksFeedback')
            : t('endSession.EscalationForm.headingBeforeYouLeave')}
        </Text>
        {!escalationFormFromServer && (
          <Text sx={styles.subtitle}>
            {t('endSession.EscalationForm.subtitle')}
          </Text>
        )}
        {!escalationFormFromServer && (
          <Flex sx={{ ...styles.optionsContainer, mb: shouldContact ? 6 : 12 }}>
            <Label sx={styles.radioLabel}>
              <Radio
                id="shouldContact"
                name="shouldContact"
                value="yes"
                onChange={() => setShouldContact(true)}
                sx={styles.radio}
              />
              {t('endSession.EscalationForm.yes')}
            </Label>
            <Label sx={styles.radioLabel}>
              <Radio
                id="shouldContact"
                name="shouldContact"
                value="no"
                onChange={() => setShouldContact(false)}
                sx={styles.radio}
              />
              {t('endSession.EscalationForm.no')}
            </Label>
          </Flex>
        )}
        {shouldContact && (
          <>
            <Text sx={styles.emailPrompt}>
              {escalationFormFromServer
                ? t('endSession.EscalationForm.emailPromptFromServer')
                : t('endSession.EscalationForm.emailPromptNotFromServer')}
            </Text>
            <Flex sx={styles.emailWrapper}>
              <Box as="label" htmlFor="email" sx={styles.label}>
                {t('endSession.EscalationForm.email')}
              </Box>
              <Box
                sx={styles.emailContainer}
                className={errorInEmail ? 'error' : ''}
              >
                <Input
                  type="email"
                  data-testid="escalation-email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  sx={styles.emailInput}
                />
                {errorInEmail && (
                  <Text>{t('endSession.EscalationForm.invalidEmail')}</Text>
                )}
              </Box>
            </Flex>
          </>
        )}

        <EndSessionActions
          onConfirm={trackHandler(leaveChat, 'escalation-form-leave-chat-btn')}
          onDismiss={trackHandler(submit, 'escalation-form-back-to-chat-btn')}
        />
      </Box>
    </Overlay>
  )
}

export default EscalationForm
