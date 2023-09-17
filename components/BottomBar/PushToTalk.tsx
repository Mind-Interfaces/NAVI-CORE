import React from 'react'
import styles from './styles'
import { Text, Button } from 'rebass'
import { ReactComponent as MicIcon } from '../../assets/img/mic-icon.svg'
import { useVolume } from 'uneeq-react-core'
import { useTheme } from 'emotion-theming'

import { keyframes } from '@emotion/core'
import { useIsSmallScreen } from '../../'
import { useTranslation } from 'react-i18next'

const fourTwo = (a: any, b: any) => [a, a, a, a, b, b]

const bganimationOneSide = keyframes`
    0% {
        background-size: 300% 100%;
    }
    100% {
        background-size: 30% 100%;
    }
`
const pulse = (pttMobileGlow: string) => keyframes`
  0% {
    box-shadow: 0px 0px 0px 1px  ${pttMobileGlow};
  }
  25% {
    box-shadow: 0px 0px 0px 6px  ${pttMobileGlow};
  }
  50% {
    box-shadow: 0px 0px 0px 11px  ${pttMobileGlow};
  }
  75% {
    box-shadow: 0px 0px 0px 6px  ${pttMobileGlow};
  }  
  100% {
    box-shadow: 0px 0px 0px 1px ${pttMobileGlow};
  }
`

export interface SendingRecording {
  sending: boolean
  recording: boolean
}
const PushToTalk: React.FC<SendingRecording> = ({ recording, sending }) => {
  const isSmallScreen = useIsSmallScreen()
  const theme = useTheme() as any
  const { pttMobileGlow } = theme.colors
  const { t } = useTranslation()

  const volume = useVolume(recording)
  const backgroundSize = recording ? `${volume * 2}% 100%` : undefined
  const pttCol = recording
    ? theme.colors.pttColRecording
    : sending
    ? theme.colors.pttColSending
    : theme.colors.pttColWaiting
  const pttImg = recording
    ? theme.colors.pttImgRecording
    : sending
    ? theme.colors.pttImgSending
    : theme.colors.pttImgWaiting
  return (
    <Button
      variant="primary"
      sx={{
        ...styles.pushToTalkButton,
        backgroundColor: fourTwo('primary', pttCol),
        '&:hover': {
          backgroundColor: fourTwo('primaryLight', pttCol)
        },
        backgroundImage: fourTwo('initial', pttImg),
        backgroundRepeat: 'no-repeat',
        backgroundPosition: sending ? '150% 100%' : '50% 100%',
        backgroundSize: fourTwo('initial', backgroundSize),
        animation: recording
          ? fourTwo(`${pulse(pttMobileGlow)} 1.2s infinite`, `none`)
          : sending
          ? `${bganimationOneSide} 2s ease-in-out forwards infinite`
          : 'none',
        transition: recording ? '0.2s' : 'all 1s',
        boxShadow: recording
          ? fourTwo(`0px 0px 0px 11px ${pttMobileGlow}`, 'none')
          : 'none',
        '&:focus': {
          boxShadow: recording
            ? fourTwo(`0px 0px 0px 11px ${pttMobileGlow}`, 'none')
            : 'none'
        },
        width: [47, 47, 70, 70, 310, 310],
        height: [47, 47, 70, 70, 'auto', 'auto']
      }}
    >
      {sending && isSmallScreen ? (
        <svg
          width="25"
          height="25"
          viewBox="0 0 125 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="62.5"
            cy="62.5"
            fill="none"
            r="57.5"
            id="sending_circle"
            stroke="#000000"
          />
        </svg>
      ) : (
        <MicIcon />
      )}

      <Text sx={styles.pushToTalkText} as="span">
        {sending ? (
          <span>{t('BottomBar.PushToTalk.sending')}</span>
        ) : recording ? (
          <span>{t('BottomBar.PushToTalk.recording')}</span>
        ) : (
          <span>{t('BottomBar.PushToTalk.waiting')}</span>
        )}
      </Text>
    </Button>
  )
}

export default PushToTalk
