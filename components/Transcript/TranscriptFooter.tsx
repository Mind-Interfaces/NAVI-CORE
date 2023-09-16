import { Input, Label } from '@rebass/forms'
import React, { useContext, useState } from 'react'
import { Flex } from 'rebass'
import { trackEvent, trackHandler, UneeqContext } from 'uneeq-react-core'
import { ReactComponent as SendIcon } from '../../assets/img/send-message.svg'
import styles from './styles'
import { useTranslation } from 'react-i18next'

interface TranscriptFooterProps {
  setHasText: (hasText: boolean) => void
}
const TranscriptFooter: React.FC<TranscriptFooterProps> = ({ setHasText }) => {
  const [text, _setText] = useState('')
  const { sendText } = useContext(UneeqContext)
  const { t } = useTranslation()

  const setText = (text: string) => {
    _setText(text)
    setHasText(!!text)
  }

  const send = () => {
    sendText(text)
    setText('')
  }
  return (
    <Flex className="transcript-footer" sx={styles.footer}>
      <Label sx={styles.questionInputLabel} htmlFor="questionInput">
        Question
      </Label>
      <Input
        placeholder={t('TranscriptFooter.inputPlaceholder')}
        value={text}
        id="questionInput"
        data-testid="questionInput"
        onChange={e => setText(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            trackEvent('transcript-send-enter-key')
            send()
          }
        }}
        sx={styles.textInput}
      />
      <Flex
        sx={{
          ...styles.sendButton,
          color: text.length > 0 ? 'primary' : 'greyLight'
        }}
        data-testid="transcriptSendBtn"
        onClick={trackHandler(send, 'transcript-send-btn')}
      >
        <SendIcon />
      </Flex>
    </Flex>
  )
}

export default TranscriptFooter
