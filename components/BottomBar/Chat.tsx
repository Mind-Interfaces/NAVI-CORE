import React, { useState, KeyboardEvent, useContext } from 'react'
import { Flex } from 'rebass'
import styles from './styles'
import {
  trackEvent,
  trackHandler,
  UneeqContext,
  useUneeqState
} from 'uneeq-react-core'
import { Label, Input } from '@rebass/forms'
import { ReactComponent as SendIcon } from '../../assets/img/send.svg'
import { useTranslation } from 'react-i18next'

const Chat = () => {
  const [text, setText] = useState('')
  const { sendText, dispatch } = useContext(UneeqContext)
  const { typeModeFromBackend } = useUneeqState()
  const { t } = useTranslation()

  const send = () => {
    sendText(text)
    setText('')
  }

  const sendOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      trackEvent('chat-send-enter-key')
      send()
    }
  }

  const hideUIElements = () => {
    typeModeFromBackend && dispatch({ type: 'resetTypeModeFromBackend' })
    dispatch({ type: 'hideUI' })
  }
  const showUIElements = () => {
    dispatch({ type: 'showUI' })
  }

  return (
    <Flex sx={styles.chatContainer}>
      <Label sx={styles.chatLabel} htmlFor="chat">
        Chat
      </Label>
      <Input
        id="chat"
        value={text}
        placeholder={t('BottomBar.Chat.placeholder')}
        autoFocus={!typeModeFromBackend}
        onChange={e => setText(e.target.value)}
        onFocus={hideUIElements}
        onBlur={showUIElements}
        onKeyDown={sendOnEnter}
        sx={styles.chatTextInput}
      />
      <Flex
        onClick={trackHandler(send, 'chat-send-btn')}
        sx={styles.chatSendButton}
      >
        <SendIcon />
      </Flex>
    </Flex>
  )
}

export default Chat
