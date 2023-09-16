import React from 'react'
import { Text, Flex, Image, Button, Box } from 'rebass'
import chromeIcon from '../../assets/img/chrome-icon.png'
import safariIcon from '../../assets/img/safari-icon.png'
import styles from './styles'
import Overlay from '../generic/Overlay'

import { isIOS } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

interface UnsupportedBrowserProps {
  close: () => void
}

const UnsupportedBrowser: React.FC<UnsupportedBrowserProps> = ({ close }) => {
  const { t } = useTranslation()
  return (
    <Overlay>
      <Box variant="modal">
        <Text sx={styles.heading}>{t('UnsupportedBrowser.heading')}</Text>
        <Text sx={styles.paragraph}>{t('UnsupportedBrowser.paragraph1')}</Text>
        <Text sx={styles.paragraph}>{t('UnsupportedBrowser.paragraph2')}</Text>
        <Flex sx={styles.browserIcons}>
          {!isIOS && <Image src={chromeIcon} alt="Chrome" mr={2} />}
          <Image src={safariIcon} alt="Safari" />
        </Flex>
        <Flex sx={styles.buttons}>
          <Button
            variant="secondaryInverted"
            onClick={close}
            sx={styles.backToHomeButton}
          >
            {t('UnsupportedBrowser.backToHome')}
          </Button>
          {!isIOS && (
            <Button
              variant="secondary"
              as="a"
              href="https://www.google.com/chrome/"
            >
              {t('UnsupportedBrowser.getChrome')}
            </Button>
          )}
        </Flex>
      </Box>
    </Overlay>
  )
}

export default UnsupportedBrowser
