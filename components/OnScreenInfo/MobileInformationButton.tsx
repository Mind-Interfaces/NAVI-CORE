import React, { useContext } from 'react'
import { Flex } from 'rebass'
import { UneeqContext, useUneeqState } from 'uneeq-react-core'

import { styles as s } from './styles'
import { ReactComponent as InformationButtonIcon } from '../../assets/img/information-button.svg'

const styles = s.savedItems

const MobileInformationButton = () => {
  const { onScreenInfo } = useUneeqState()
  const { dispatch } = useContext(UneeqContext)
  const expand = () =>
    dispatch({ type: 'openMobileInformation', payload: true })

  if (!onScreenInfo.information) {
    return null
  }

  return (
    <Flex
      sx={styles.mobileSavedItemsButton}
      data-testid="mobileInfoButton"
      onClick={expand}
    >
      <InformationButtonIcon />
    </Flex>
  )
}

export default MobileInformationButton
