import { Textarea } from '@rebass/forms'
import React, { useContext, useState } from 'react'
import { Box, Card, Flex, Text } from 'rebass'
import { trackHandler, UneeqContext, useUneeqState } from 'uneeq-react-core'
import Overlay from '../../generic/Overlay'
import EndSessionActions from '../EndSessionActions'
import styles from './styles'
import { Trans, useTranslation } from 'react-i18next'

interface FeedbackProps {
  restart: () => void
  isOpen: boolean
}

const Feedback: React.FC<FeedbackProps> = ({ restart, isOpen }) => {
  const [feedbackScore, setFeedbackScore] = useState<number | undefined>()
  const [recommendationScore, setRecommendationScore] = useState<
    number | undefined
  >()
  const [feedbackText, setFeedbackText] = useState('')
  const { dispatch, config, sendData } = useContext(UneeqContext)
  const { contactDetailsGiven } = useUneeqState()
  const { t } = useTranslation()

  if (!isOpen) return null

  const giveFeedback = () => {
    if (feedbackScore || feedbackText) {
      sendData({ feedbackScore, feedbackText, recommendationScore })
      console.info('form sent', {
        rating: feedbackScore,
        comment: feedbackText,
        recommendationScore
      })
    }
    dispatch({ type: 'giveFeedback' })
  }
  const leaveChat = () => {
    giveFeedback()

    if (config.showEscalationForm) {
      if (!contactDetailsGiven) {
        dispatch({ type: 'openEscalationForm', payload: true })
      } else {
        restart()
      }
    } else {
      restart()
    }
  }

  return (
    <Overlay>
      <Card sx={styles.modal}>
        <Text sx={styles.title} variant="heading">
          {t('endSession.Feedback.heading')}
        </Text>

        <Text sx={styles.subtitle}>
          <Trans
            i18nKey={`endSession.Feedback.howLikelySubtitle`}
            values={{ avatarName: config.avatarName }}
            t={t}
          >
            How likely are you to recommend our digital representative to a
            friend or colleague?
          </Trans>
        </Text>
        <Box sx={styles.recommendationContainer}>
          <Flex sx={styles.numberLabels}>
            <Text sx={styles.notLikely}>
              {t('endSession.Feedback.notVeryLikely')}
            </Text>
            <Text sx={styles.extremelyLikely}>
              {t('endSession.Feedback.extremelyLikely')}
            </Text>
          </Flex>
          <Flex sx={styles.numbersContainer}>
            {[0, 1, 2, 3, 4, 5, 11, 6, 7, 8, 9, 10].map(num => (
              <Flex
                key={num}
                data-testid={`recomm-${num}`}
                onClick={() => setRecommendationScore(num)}
                sx={{
                  ...styles.number,
                  color:
                    recommendationScore !== undefined &&
                    num <= recommendationScore
                      ? 'white'
                      : 'secondary',
                  backgroundColor:
                    recommendationScore !== undefined &&
                    num <= recommendationScore
                      ? 'secondary'
                      : 'white'
                }}
              >
                {num}
              </Flex>
            ))}
          </Flex>
        </Box>

        <Text sx={styles.subtitle}>
          {t('endSession.Feedback.howEasySubtitle')}
        </Text>
        <Box sx={styles.recommendationContainer}>
          <Flex sx={styles.numberLabels}>
            <Text sx={styles.notLikely}>
              {t('endSession.Feedback.notVeryLikely')}
            </Text>
            <Text sx={styles.extremelyLikely}>
              {t('endSession.Feedback.extremelyLikely')}
            </Text>
          </Flex>
          <Flex sx={styles.numbersContainer}>
            {[0, 1, 2, 3, 4, 5, 11, 6, 7, 8, 9, 10].map(num => (
              <Flex
                key={num}
                data-testid={`easy-${num}`}
                onClick={() => setFeedbackScore(num)}
                sx={{
                  ...styles.number,
                  color:
                    feedbackScore !== undefined && num <= feedbackScore
                      ? 'white'
                      : 'secondary',
                  backgroundColor:
                    feedbackScore !== undefined && num <= feedbackScore
                      ? 'secondary'
                      : 'white'
                }}
              >
                {num}
              </Flex>
            ))}
          </Flex>
        </Box>
        <Text fontSize={1}>
          <Trans
            i18nKey={`endSession.Feedback.whatsYourImpression`}
            values={{ avatarName: config.avatarName }}
            t={t}
          >
            What&apos;s your impression of our digital representative?
          </Trans>
        </Text>
        <Textarea
          sx={styles.textArea}
          id="comment"
          data-testid="comment-textarea"
          name="comment"
          value={feedbackText}
          onChange={e => setFeedbackText(e.target.value)}
        />
        <EndSessionActions
          onConfirm={trackHandler(leaveChat, 'rate-session-leave-chat-btn')}
          onDismiss={trackHandler(
            giveFeedback,
            'rate-session-back-to-chat-btn'
          )}
        />
      </Card>
    </Overlay>
  )
}

export default Feedback
