import React from 'react'
import { useUneeqState } from 'uneeq-react-core'
import Information from './Information'
import { Box } from 'rebass'
import { motion, AnimatePresence } from 'framer-motion'
import InformationExpanded from './InformationExpanded'
import styles from './styles'

const MotionCard = motion.custom(Box)

const OnScreenInfo = () => {
  const { hiddenUI, onScreenInfo, mobileInformationOpen } = useUneeqState()

  return (
    <>
      <InformationExpanded />
      <Box
        sx={{
          ...styles.conatianer,
          display:
            hiddenUI || !mobileInformationOpen
              ? ['none', 'none', 'none', 'none', 'flex', 'flex']
              : 'flex'
        }}
        id="onscreeninfo-container"
      >
        <AnimatePresence>
          {onScreenInfo.information && (
            <MotionCard
              sx={styles.card}
              variant="card"
              initial={{
                opacity: 0,
                transform: 'translate(0px, 200px)'
              }}
              animate={{
                opacity: 1,
                transform: `translate(0px, 0px)`
              }}
              exit={{
                opacity: 0,
                transform: `translate(0px, -200px)`
              }}
            >
              <Information information={onScreenInfo.information} />
            </MotionCard>
          )}
        </AnimatePresence>
      </Box>
    </>
  )
}

export default OnScreenInfo
