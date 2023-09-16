import React from 'react'
import { Flex, Text, Button, Box } from 'rebass'
import { trackEvent } from 'uneeq-react-core'
import styles from './styles'
import Overlay from '../generic/Overlay'
import { isSafari } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

interface PermissionsRejectedProps {
  restart: () => void
}
const PermissionsRejected: React.FC<PermissionsRejectedProps> = ({
  restart
}) => {
  trackEvent('permissions-rejected', 'state-change')
  const { t } = useTranslation()

  return (
    <Overlay>
      <Box variant="modal" sx={styles.container}>
        <Text sx={styles.headingTwo}>{t('PermissionsRejected.heading')}</Text>
        <Text sx={styles.explanation}>
          {t('PermissionsRejected.explanation')}{' '}
          <Text
            as="a"
            href="/privacy_policy.html"
            target="_blank"
            rel="noreferrer noopener"
            sx={styles.privacyPolicyLink}
          >
            {t('PermissionsRejected.linkText')}
          </Text>
          .
        </Text>

        <Flex sx={styles.notice}>
          {!isSafari ? (
            <Text>{t('PermissionsRejected.noticeNotSafari')}</Text>
          ) : (
            <Text>{t('PermissionsRejected.noticeSafari')}</Text>
          )}
          <Text>{t('PermissionsRejected.noticeText')}</Text>
        </Flex>

        <Flex sx={styles.buttonsContainer}>
          <Button
            data-testid="backButton"
            variant="secondaryInverted"
            sx={styles.backButton}
            onClick={() => {
              trackEvent('permissions-rejected-homepage-btn')
              restart()
            }}
          >
            {t('PermissionsRejected.backToHome')}
          </Button>

          <Button
            data-testid="reload"
            sx={styles.reloadButton}
            variant="secondary"
            onClick={() => {
              trackEvent('permissions-rejected-reload-btn')
              window.location.reload()
            }}
          >
            {t('PermissionsRejected.reloadPermissions')}
          </Button>
        </Flex>
      </Box>
    </Overlay>
  )
}

export default PermissionsRejected
