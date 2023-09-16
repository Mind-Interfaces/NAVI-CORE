import React, { useContext, useEffect } from 'react'
import { Flex, Text } from 'rebass'
import styles from './styles'
import { UneeqContext, useIsSmallScreen } from 'uneeq-react-core'
import { useTranslation } from 'react-i18next'

interface InputProblemProps {
  error: string
}
const InputProblem: React.FC<InputProblemProps> = ({ error }) => {
  const {
    dispatch,
    config: { inputProblemErrorHiddenAfter }
  } = useContext(UneeqContext)
  const { t } = useTranslation()

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: 'clearError' })
    }, inputProblemErrorHiddenAfter)

    return () => clearTimeout(timeout)
  }, [inputProblemErrorHiddenAfter, dispatch])

  const isSmallScreen = useIsSmallScreen()

  const spacebarTapped = !isSmallScreen
    ? t('InputProblem.spacebarNotSmallScreen')
    : t('InputProblem.spacebarSmallScreen')

  return (
    <Flex sx={styles.container}>
      {error === 'noInput' ? (
        <>
          <Text sx={styles.errorText}>{t('InputProblem.noInput')}</Text>
        </>
      ) : (
        error === 'spacebarTapped' && (
          <>
            <Text sx={styles.errorText}>{spacebarTapped}</Text>
          </>
        )
      )}
    </Flex>
  )
}

export default InputProblem
