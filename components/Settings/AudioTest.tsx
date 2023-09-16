import React, { useEffect, useState } from 'react'
import { Text, Flex } from 'rebass'
import styles from './styles'
import { ReactComponent as SpeakerIcon } from '../../assets/img/speaker.svg'
import { useTranslation } from 'react-i18next'

interface UseAudio {
  (url: string): [boolean, () => void]
}
const useAudio: UseAudio = url => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    setPlaying(!playing)
  }

  useEffect(() => {
    const stop = () => {
      audio.pause()
      audio.currentTime = 0
    }
    playing ? audio.play() : stop()

    return () => stop()
  }, [audio, playing])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [audio])

  return [playing, toggle]
}

interface AudioTestProps {
  audio: any
}
const AudioTest: React.FC<AudioTestProps> = ({ audio: { testMP3 } }) => {
  const [playing, toggle] = useAudio(testMP3)
  const { t } = useTranslation()

  return (
    <Flex sx={styles.testAudio.wrapper} onClick={toggle}>
      <SpeakerIcon />
      <Text>
        {playing
          ? t('Settings.AudioTest.playing')
          : t('Settings.AudioTest.test')}
      </Text>
    </Flex>
  )
}

export default AudioTest
