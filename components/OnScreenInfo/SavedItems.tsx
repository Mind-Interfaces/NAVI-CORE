import React, { useContext } from 'react'
import { Box, Button, Flex } from 'rebass'
import { UneeqContext, useUneeqState } from '../../'

import { styles as s } from './styles'
import { ReactComponent as HeartFullIcon } from '../../assets/img/heart-full.svg'

const styles = s.savedItems

const SavedItems = () => {
  const { savedItems } = useUneeqState()
  const { dispatch } = useContext(UneeqContext)

  const toggleSavedOpen = () => dispatch({ type: 'expandSavedItem' })

  if (!savedItems.length) {
    return null
  }

  return (
    <Box sx={styles.savedItemsButton}>
      <Button variant="unstyled" onClick={toggleSavedOpen}>
        <Flex sx={styles.heartContainer}>
          <HeartFullIcon />
        </Flex>
        <HeartFullIcon />
        Saved ({savedItems.length})
      </Button>
    </Box>
  )
}

export default SavedItems
