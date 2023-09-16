import React from 'react'
import { Flex, Text } from 'rebass'
import styles from './styles'

interface UserQuestionProps {
  children: React.ReactNode
}
const UserQuestion: React.FC<UserQuestionProps> = React.forwardRef(
  ({ children }, ref): any => {
    if (!children) return null
    return (
      <Flex sx={styles.container}>
        <Flex sx={styles.inner} ref={ref}>
          <Text as="span">{children}</Text>
        </Flex>
      </Flex>
    )
  }
)

export default UserQuestion
