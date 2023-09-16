import React, { useContext } from 'react'
import { UneeqContext } from 'uneeq-react-core'
import { Button, Flex } from 'rebass'
import styles from './styles'
import { useTranslation } from 'react-i18next'

interface EndSessionActionsProps {
  onConfirm: () => void
  onDismiss: () => void
}

const EndSessionActions: React.FC<EndSessionActionsProps> = ({
  onConfirm,
  onDismiss
}) => {
  const { dispatch } = useContext(UneeqContext)
  const { t } = useTranslation()

  const goBackToChat = () => {
    dispatch({ type: 'closeModal' })
    onDismiss()
  }

  return (
    <Flex sx={styles.buttonsWrapper}>
      <Button
        sx={styles.button}
        variant="secondaryInverted"
        mr={[0, 0, 0, 0, 3]}
        mb={[3, 3, 3, 3, 0]}
        onClick={goBackToChat}
      >
        {t('endSession.EndSessionActions.backToChat')}
      </Button>
      <Button sx={styles.button} variant="secondary" onClick={onConfirm}>
        {t('endSession.EndSessionActions.leaveChat')}
      </Button>
    </Flex>
  )
}

export default EndSessionActions
