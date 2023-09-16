import React from 'react'
import { Flex, Text } from 'rebass'
import { ReactComponent as ExclamationIcon } from '../../assets/img/exclamation.svg'
import { styles as s } from './styles'
const styles = s.error

interface ErrorProps {
  message?: string
}
const Error: React.FC<ErrorProps> = ({
  message = `An unknown error ocurred`
}) => (
  <Flex sx={styles.container}>
    <Flex sx={styles.sideBorderError} />
    <Flex sx={styles.warning}>
      <Flex sx={styles.headingContainer}>
        <Flex sx={styles.icon}>
          <ExclamationIcon />
        </Flex>
        <Text sx={styles.heading}>Error</Text>
      </Flex>
      <Text sx={styles.message}>{message}</Text>
    </Flex>
  </Flex>
)

export default Error
