import React, { KeyboardEvent, useRef, useState } from 'react'
import { Box, Button, Flex, Text } from 'rebass'
import styles from './styles'
import Overlay from '../generic/Overlay'
import { Label, Input } from '@rebass/forms'
import { ReactComponent as PasscodeEye } from '../../assets/img/passcode-eye.svg'
import { ReactComponent as PasscodeEyeDash } from '../../assets/img/passcode-eye-dash.svg'
import FatalError from '../Errors/FatalError'
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { useTranslation } from 'react-i18next'

const fetchToken = (
  tokenUrl: string,
  passcode: string,
  recaptchaToken: string
) =>
  fetch(tokenUrl, {
    headers: {
      Authorization: `Bearer ${passcode}`,
      'X-Recaptcha-Token': recaptchaToken
    }
  })

interface PasscodeFormProps {
  showErrorModal: () => void
  start: (token: string) => void
  config: { tokenUrl: string; recaptchaSiteKey?: string }
}
const PasscodeForm: React.FC<PasscodeFormProps> = ({
  showErrorModal,
  start,
  config
}) => {
  const [inputType, setInputType] = useState<'password' | 'text'>('password')
  const [password, setPassword] = useState('')
  const toggleInputMode = (e: any) => {
    e.stopPropagation()
    setInputType(inputType === 'password' ? 'text' : 'password')
  }
  const { t } = useTranslation()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const submitForm = async () => {
    const recaptchaToken = config.recaptchaSiteKey
      ? await executeRecaptcha!('passcode_screen')
      : ''
    const response = await fetchToken(
      config.tokenUrl!,
      password,
      recaptchaToken
    )
    if (response.status === 401) {
      showErrorModal()
    } else if (response.status === 200) {
      const { token } = await response.json()
      start(token)
    } else {
      console.warn('Error fetching token', response)
    }
  }

  const sendOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitForm()
    }
  }

  return (
    <Flex sx={styles.formContainer}>
      <Label htmlFor="passcode" sx={styles.title}>
        {t('PasscodeOverlay.heading')}
      </Label>
      <Box sx={styles.passcodeInputContainer}>
        <Input
          id="passcode"
          name="passcode"
          type={inputType}
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={sendOnEnter}
        />
        <Flex sx={styles.toggleButton} onClick={toggleInputMode}>
          {inputType === 'text' ? <PasscodeEyeDash /> : <PasscodeEye />}
        </Flex>
      </Box>

      <Button variant="primary" onClick={submitForm} sx={styles.nextButton}>
        {t('PasscodeOverlay.nextButton')}
      </Button>
    </Flex>
  )
}

interface PasscodeErrorProps {
  closeModal: () => void
}
const PasscodeError: React.FC<PasscodeErrorProps> = ({ closeModal }) => {
  return (
    <FatalError clearError={closeModal} errorTitle="Invalid Passcode">
      <Text sx={{ textAlign: 'center' }}>
        The passcode you entered is incorrect.
      </Text>
    </FatalError>
  )
}

interface PasscodeOverlayProps {
  close: () => void
  start: (token: string) => void
  config: { tokenUrl: string; recaptchaSiteKey?: string }
}
const PasscodeOverlay: React.FC<PasscodeOverlayProps> = ({
  close,
  start,
  config
}) => {
  const [showErrorModal, setShowErrorModal] = useState(false)
  const toggleErrorModal = () => setShowErrorModal(!showErrorModal)
  const modalRef = useRef()
  useOnClickOutside(modalRef, close)

  return (
    <Overlay sx={{ zIndex: 10, position: 'fixed' }}>
      <GoogleReCaptchaProvider reCaptchaKey={config.recaptchaSiteKey}>
        <Box sx={styles.modal} ref={modalRef}>
          {!showErrorModal && (
            <PasscodeForm
              showErrorModal={toggleErrorModal}
              start={start}
              config={config}
            />
          )}
          {showErrorModal && <PasscodeError closeModal={toggleErrorModal} />}
        </Box>
      </GoogleReCaptchaProvider>
    </Overlay>
  )
}

export default PasscodeOverlay
