import React, { useContext } from 'react'
import { Button } from 'rebass'
import { UneeqContext, useUneeqState } from 'uneeq-react-core'

import { styles as s } from './styles'
import { ReactComponent as HeartFullIcon } from '../../assets/img/heart-full.svg'

const styles = s.savedItems

const MobileSavedItems = () => {
  const { savedItems } = useUneeqState()
  const { dispatch } = useContext(UneeqContext)

  const toggleSavedOpen = () => dispatch({ type: 'expandSavedItem' })

  if (!savedItems.length) {
    return null
  }

  return (
    <Button
      sx={styles.mobileSavedItemsButton}
      variant="primaryInverted"
      onClick={toggleSavedOpen}
    >
      <HeartFullIcon />
    </Button>
  )
}

export default MobileSavedItems
