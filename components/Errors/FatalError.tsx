import React from 'react'
import { Button, Text, Flex, Heading, Box } from 'rebass'
import styles from './styles'
import { trackHandler } from '../../'
import Overlay from '../generic/Overlay'
import { ReactComponent as ExclamationIcon } from '../../assets/img/exclamation.svg'

interface FatalErrorProps {
  errorTitle?: string
  errorMessage?: string
  clearError?: () => void
  children?: React.ReactNode
}
const FatalError: React.FC<FatalErrorProps> = ({
  errorTitle = '404 Error',
  errorMessage = `Sorry, something's gone wrong (#6489)`,
  clearError,
  children
}) => (
  <Overlay>
    <Box variant="modal" sx={styles.fatal.container}>
      <Flex sx={styles.fatal.icon}>
        <ExclamationIcon />
      </Flex>

      <Heading sx={styles.fatal.heading}>{errorTitle}</Heading>
      {!children && <Text sx={styles.fatal.message}>{errorMessage}</Text>}
      {children !== undefined && (
        <Flex sx={styles.fatal.childrenContainer}>{children}</Flex>
      )}
      {clearError && (
        <Button
          sx={styles.fatal.backButton}
          variant="secondaryInverted"
          onClick={trackHandler(clearError, 'close-error-btn')}
        >
          Back to homepage
        </Button>
      )}
    </Box>
  </Overlay>
)

export default FatalError
