import React, { useContext, useEffect } from 'react'
import { Flex, Text } from 'rebass'
import { ReactComponent as WarningIcon } from '../../assets/img/warning-icon.svg'
import { styles as s } from './styles'
import { UneeqContext } from '../../'
const styles = s.warning

interface WarningProps {
  message: string
}
const Warning: React.FC<WarningProps> = ({ message }) => {
  const {
    dispatch,
    config: { warningHiddenAfter }
  } = useContext(UneeqContext)

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'clearError' })
    }, warningHiddenAfter)
  }, [warningHiddenAfter, dispatch])

  return (
    <Flex sx={styles.container}>
      <Flex sx={styles.sideBorder} />
      <Flex sx={styles.warning}>
        <Flex sx={styles.headingContainer}>
          <Flex sx={styles.icon}>
            <WarningIcon />
          </Flex>
          <Text sx={styles.heading}>Warning</Text>
        </Flex>
        <Text sx={styles.message}>{message}</Text>
      </Flex>
    </Flex>
  )
}

export default Warning
