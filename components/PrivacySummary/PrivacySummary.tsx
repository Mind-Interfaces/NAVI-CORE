import React, { useContext } from 'react'
import { Box, Image, Text } from 'rebass'
import { UneeqContext, useUneeqState } from 'uneeq-react-core'
import styles from './styles'
import { ReactComponent as CloseIcon } from '../../assets/img/close.svg'
import Overlay from '../generic/Overlay'
import { useTranslation } from 'react-i18next'

const PrivacySummaryOverlay: React.FC = () => {
  const { dispatch } = useContext(UneeqContext)
  const { privacyOpen } = useUneeqState()
  const { t } = useTranslation()

  if (!privacyOpen) return null

  const close = () => dispatch({ type: 'closeModal' })

  return (
    <Overlay sx={styles.container}>
      <Box variant="modal" sx={styles.modal}>
        <Image
          as={CloseIcon}
          sx={styles.closeButton}
          onClick={close}
          data-testid="privacy-summary-close"
          alt="Close"
        />
        <Text sx={styles.headingTwo} as="h2">
          {t('PrivacySummary.heading')}
        </Text>
        <Text as="p">
          {t('PrivacySummary.text')}{' '}
          <Text
            as="a"
            href="/privacy_policy.html"
            target="_blank"
            rel="noreferrer noopener"
            sx={styles.privacyPolicyLink}
          >
            {t('PrivacySummary.linkText')}
          </Text>
          .
        </Text>
      </Box>
    </Overlay>
  )
}

export default PrivacySummaryOverlay
