import React, { useContext, useRef } from 'react'
import { Image, Box, Button, Flex, Text } from 'rebass'
import {
  trackHandler,
  UneeqContext,
  useIsSmallScreen,
  useUneeqSpaceToTalk,
  useUneeqState
} from './'
import { ReactComponent as ChatIcon } from '../../assets/img/keyboard-icon.svg'
import { ReactComponent as TalkIcon } from '../../assets/img/mic-icon.svg'
import { ReactComponent as SkipIcon } from '../../assets/img/skip.svg'
import lowerBgImage from '../../assets/img/lower-bg.png'
import { ReactComponent as ChatBubbleIcon } from '../../assets/img/transcript-chat-bubble.svg'
import InputProblem from '../InputProblem'
import Chat from './Chat'
import PushToTalk from './PushToTalk'
import styles from './styles'
import UserQuestion from './UserQuestion'
import { motion, AnimatePresence } from 'framer-motion'
import SavedItems from '../OnScreenInfo/SavedItems'
import SuggestedResponses from '../OnScreenInfo/SuggestedResponses'
import MobileSavedItems from '../OnScreenInfo/MobileSavedItems'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import MobileInformationButton from '../OnScreenInfo/MobileInformationButton'
import { useTranslation } from 'react-i18next'
const MotionUserQuestion = motion.custom(UserQuestion)
const MotionBox = motion.custom(Box)

interface InputToggleProps {
  speechMode: boolean
  toggleInputMode: () => void
}
const InputToggle: React.FC<InputToggleProps> = ({
  speechMode,
  toggleInputMode
}) => {
  const { t } = useTranslation()
  return (
    <Button
      sx={{
        ...styles.toggleInputModeButton,
        display: speechMode
          ? 'flex'
          : ['none', 'none', 'none', 'none', 'flex', 'flex']
      }}
      variant="primaryInverted"
      onClick={toggleInputMode}
    >
      {speechMode ? <ChatIcon /> : <TalkIcon />}
      <Text sx={styles.inputToggleText} as="span">
        {speechMode
          ? t('BottomBar.BottomBar.type')
          : t('BottomBar.BottomBar.talk')}
      </Text>
    </Button>
  )
}

const BottomBar: React.FC = () => {
  const {
    recording,
    sending,
    startRecording,
    stopRecording
  } = useUneeqSpaceToTalk()

  const {
    inputMode,
    transcriptOpen,
    transcriptHasOpened,
    onScreenInfo,
    spacebarTapped,
    noInput,
    question,
    avatarSpeaking,
    savedItems
  } = useUneeqState()
  const { dispatch, config } = useContext(UneeqContext)
  const { t } = useTranslation()

  const speechMode = config.sendLocalAudio && inputMode === 'speech'

  const toggleInputMode = () =>
    dispatch({ type: 'setInputMode', payload: speechMode ? 'text' : 'speech' })
  const openTranscript = () =>
    dispatch({ type: 'openTranscript', payload: true })

  const inputError = spacebarTapped ? 'spacebarTapped' : noInput && 'noInput'

  const shouldShowQuestion =
    question && !onScreenInfo?.suggestedResponses?.chosenResponse

  const trimmedQuestion =
    question?.length > 267 ? question.substring(0, 267).concat('...') : question

  const inputModeContainer = useRef()
  useOnClickOutside(inputModeContainer, toggleInputMode)

  const isSmallScreen = useIsSmallScreen()

  return (
    <Flex sx={styles.bar}>
      <Image sx={styles.lowerBg} src={lowerBgImage} alt="" />
      <Flex sx={styles.left} />
      <Flex sx={styles.userQuestionMotionContainer}>
        <AnimatePresence>
          {shouldShowQuestion && (
            <MotionUserQuestion
              variants={{
                start: {
                  opacity: 0,
                  transition: {
                    delay: 1.5
                  },
                  transform: 'translateX(-200px)'
                },
                end: {
                  opacity: 1,
                  transition: {
                    delay: 1.5
                  },
                  transform: 'translateX(1px)'
                },
                final: {
                  opacity: 0,
                  transform: 'translateX(200px)'
                }
              }}
              initial="start"
              animate="end"
              exit="final"
              key="question"
            >
              {trimmedQuestion}
            </MotionUserQuestion>
          )}
        </AnimatePresence>
      </Flex>
      <Flex
        sx={{
          ...styles.center,
          alignItems: shouldShowQuestion || avatarSpeaking ? 'center' : 'normal'
        }}
      >
        <AnimatePresence>
          {onScreenInfo?.suggestedResponses && (
            <MotionBox sx={styles.motionSuggestedResponses}>
              <SuggestedResponses />
            </MotionBox>
          )}
        </AnimatePresence>

        {avatarSpeaking &&
        onScreenInfo?.nextSuggestedResponses?.suggestedResponses?.length > 0 ? (
          <Button
            variant="primaryInverted"
            sx={styles.skip}
            onClick={() => dispatch({ type: 'skip' })}
          >
            <SkipIcon />
            <span>Show next steps</span>
          </Button>
        ) : (
          <Flex sx={styles.pttOuterContainer}>
            {speechMode && (
              <Flex sx={styles.pttContainer}>
                <Flex sx={styles.emptyContainer} />
                <Flex sx={styles.mobileContainer}>
                  <MobileInformationButton />
                </Flex>
                <Box
                  onTouchStart={startRecording}
                  onTouchEnd={stopRecording}
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                >
                  <PushToTalk recording={recording} sending={sending} />
                </Box>
                <Flex>
                  <InputToggle
                    speechMode={speechMode}
                    toggleInputMode={trackHandler(
                      toggleInputMode,
                      speechMode
                        ? 'enable-type-mode-btn'
                        : 'disable-type-mode-btn'
                    )}
                  />
                  <Flex sx={styles.mobileContainer}>
                    <MobileSavedItems />
                  </Flex>
                </Flex>
              </Flex>
            )}
            {!speechMode && (
              <Flex sx={styles.chatAndInputToggleContainer}>
                {isSmallScreen ? (
                  <Flex
                    sx={styles.mobileChatContainer}
                    ref={inputModeContainer}
                  >
                    <Chat />
                  </Flex>
                ) : (
                  <Flex sx={styles.bigScreenChatContainer}>
                    <Chat />
                  </Flex>
                )}
                {config.sendLocalAudio && (
                  <InputToggle
                    speechMode={speechMode}
                    toggleInputMode={trackHandler(
                      toggleInputMode,
                      speechMode
                        ? 'enable-type-mode-btn'
                        : 'disable-type-mode-btn'
                    )}
                  />
                )}
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
      <Box
        sx={{
          ...styles.right,
          display: speechMode
            ? 'flex'
            : ['none', 'none', 'none', 'none', 'flex', 'flex']
        }}
      />

      <Flex sx={styles.chatSavedItemsContainer}>
        {savedItems.length > 0 && <SavedItems />}
        {transcriptHasOpened && !transcriptOpen && (
          <Box onClick={openTranscript} sx={styles.chatBubbleContainer}>
            <ChatBubbleIcon />
            <span>{t('BottomBar.BottomBar.showChat')}</span>
          </Box>
        )}
      </Flex>

      {inputError && <InputProblem error={inputError} />}
    </Flex>
  )
}

export default BottomBar
