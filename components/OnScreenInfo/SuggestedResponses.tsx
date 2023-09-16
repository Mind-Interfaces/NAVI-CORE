import React, { useContext } from 'react'
import { Button, Flex } from 'rebass'
import { trackHandler, UneeqContext, useUneeqState } from 'uneeq-react-core'
import { motion, AnimatePresence } from 'framer-motion'
import { styles as s } from './styles'

const MotionButton = motion.custom(Button)
const MotionFlex = motion.custom(Flex)
const styles = s.suggestedResponses

const SuggestedResponses = () => {
  const { sendText, dispatch } = useContext(UneeqContext)

  const {
    onScreenInfo: { suggestedResponses },
    hiddenUI
  } = useUneeqState()

  const send = (response: string) => {
    sendText(response)
    dispatch({ type: 'suggestedResponseSent', payload: response })
  }

  const chosen = suggestedResponses?.chosenResponse
  const responses = suggestedResponses?.suggestedResponses

  return (
    <>
      <AnimatePresence>
        {!chosen && (
          <MotionFlex
            variants={{
              start: {
                opacity: 0,
                transform: 'translate(-100px, 0px)'
              },
              end: {
                opacity: 1,
                transform: 'translate(10px, 0px)'
              },
              final: {
                opacity: 0,
                transform: 'translate(100px, 0px)'
              }
            }}
            initial="start"
            animate="end"
            exit="final"
            sx={{
              display: hiddenUI
                ? ['none', 'none', 'none', 'none', 'flex', 'flex']
                : 'flex',
              justifyContent: [
                'left',
                'left',
                'center',
                'center',
                'center',
                'center'
              ]
            }}
          >
            <Flex sx={styles.title}>{suggestedResponses?.mainTitle}</Flex>
          </MotionFlex>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <MotionFlex
          variants={{
            start: {
              transition: {
                delay: 0.8,
                staggerChildren: 0.4
              }
            },
            end: {
              transition: {
                staggerChildren: 0.4
              }
            },
            final: {
              transition: {
                duration: 0.4
              }
            }
          }}
          initial="start"
          transition={{
            duration: 0.3
          }}
          animate="end"
          exit="final"
          sx={{
            ...styles.itemsContainer,
            display: hiddenUI
              ? ['none', 'none', 'none', 'none', 'flex', 'flex']
              : 'flex'
          }}
          key={suggestedResponses?.suggestedResponses[0].utterance}
        >
          <AnimatePresence>
            {responses?.map(
              (response: any) =>
                (!chosen || response.utterance === chosen) && (
                  <MotionButton
                    transition={{
                      duration: 0.4
                    }}
                    variant="primaryInverted"
                    variants={{
                      start: {
                        opacity: 0,
                        transform: 'translate(-200px, 0px)',
                        transition: {
                          duration: 0.4
                        }
                      },
                      end: {
                        opacity: 1,
                        transform: 'translate(1px, 0px)'
                      },
                      final: {
                        opacity: 0,
                        transform: 'translate(200px, 0px)'
                      }
                    }}
                    // initial="start"
                    // animate="end"
                    exit="final"
                    key={response.utterance}
                    sx={{
                      ...styles.item,
                      cursor: chosen ? 'auto' : 'pointer'
                    }}
                    onClick={
                      !chosen
                        ? trackHandler(
                            () => send(response.utterance),
                            'suggested-response-btn'
                          )
                        : () => {}
                    }
                  >
                    {response.label}
                  </MotionButton>
                )
            )}
          </AnimatePresence>
        </MotionFlex>
      </AnimatePresence>
    </>
  )
}

export default SuggestedResponses
