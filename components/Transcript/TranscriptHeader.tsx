import React from 'react'
import { Flex, Text } from 'rebass'
import { ReactComponent as CloseIcon } from '../../assets/img/close.svg'
import { ReactComponent as DownloadIcon } from '../../assets/img/download.svg'
import { trackHandler } from 'uneeq-react-core'
import styles from './styles'

import { isMobileSafari, isMobile, isChrome } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

interface TranscriptHeaderProps {
  close: () => void
  downloadTranscript: () => void
}
const TranscriptHeader: React.FC<TranscriptHeaderProps> = ({
  close,
  downloadTranscript
}) => {
  const { t } = useTranslation()
  return (
    <Flex
      sx={{
        ...styles.header,
        position:
          isMobileSafari || (isMobile && isChrome) ? 'absolute' : 'static',
        top: isMobileSafari ? 57 : isMobile && isChrome ? 27 : 'auto'
      }}
      className="transcript-header"
    >
      <Flex
        sx={styles.downloadIcon}
        onClick={trackHandler(downloadTranscript, 'download-transcript-btn')}
        className="button"
      >
        <Text
          className="download-tooltip"
          sx={{ ...styles.tooltip, left: 45, top: 6 }}
        >
          {t('TranscriptHeader.download')}
        </Text>
        <DownloadIcon />
      </Flex>
      <Flex sx={styles.pinButton} onClick={close} className="button">
        <Text
          className="transcript-tooltip"
          sx={{ ...styles.tooltip, right: 40 }}
        >
          {t('TranscriptHeader.minimise')}
        </Text>
        <Flex sx={styles.pinIcon}>
          <CloseIcon />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TranscriptHeader
