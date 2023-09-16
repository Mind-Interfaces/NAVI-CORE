import React, { useContext, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import { Box, Flex, Text } from 'rebass'
import {
  trackHandler,
  UneeqContext,
  useTranscript,
  useUneeqState
} from 'uneeq-react-core'
import styles from './styles'
import TranscriptFooter from './TranscriptFooter'
import TranscriptHeader from './TranscriptHeader'
import TranscriptMessage from './TranscriptMessage'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { InformationItem } from '../OnScreenInfo/Information'

const MotionBox: any = motion.custom(Box)

export interface TranscriptItem {
  information?: InformationItem[]
  message: string
  user: boolean
  time: Date
}

const Transcript: React.FC = () => {
  const { dispatch } = useContext(UneeqContext)
  const { transcriptOpen } = useUneeqState()
  const { downloadTranscript, transcript } = useTranscript()
  const hasText = useRef<boolean>()
  const { t } = useTranslation()

  // autoscroll to bottom
  const scrollArea = useRef<HTMLElement>()
  useEffect(() => {
    if (scrollArea && scrollArea.current) {
      scrollArea.current.scrollTop =
        scrollArea?.current.scrollHeight - scrollArea?.current.clientHeight
    }
  }, [transcriptOpen, transcript])

  const close = () => dispatch({ type: 'closeTranscript' })

  const width = window.screen.availWidth

  return (
    <AnimatePresence>
      {transcriptOpen && (
        <MotionBox
          initial={{
            opacity: 1,
            transform: `translate(${width * 1.5}px,0px)`
          }}
          animate={{
            opacity: 1,
            transform: `translate(0px, 0px)`
          }}
          exit={{
            opacity: 1,
            transform: `translate(${width * 1.5}px,0px)`
          }}
          sx={styles.container}
        >
          <Draggable handle=".handle" cancel=".button">
            <Flex variant="transcript" sx={styles.transcript}>
              <Flex sx={styles.headerBigScreen} className="handle">
                <TranscriptHeader
                  close={trackHandler(close, 'transcript-close')}
                  downloadTranscript={downloadTranscript}
                />
              </Flex>
              <Flex sx={styles.headerSmallScreen}>
                <TranscriptHeader
                  close={trackHandler(close, 'transcript-close')}
                  downloadTranscript={downloadTranscript}
                />
              </Flex>
              <Flex
                ref={scrollArea}
                className="transcript-content"
                sx={styles.scrollArea}
              >
                <Box sx={styles.scrollContent}>
                  {transcript.length ? (
                    transcript.map((line: TranscriptItem) => (
                      <TranscriptMessage
                        key={line.time.valueOf()}
                        line={line}
                      />
                    ))
                  ) : (
                    <Text>{t('Transcript.noTranscriptAvailable')}</Text>
                  )}
                </Box>
              </Flex>
              <TranscriptFooter
                setHasText={(has: boolean) => {
                  hasText.current = has
                }}
              />
            </Flex>
          </Draggable>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}

export default Transcript
