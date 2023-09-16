import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  deviceDetect,
  getUA,
  isAndroid,
  isChrome,
  isChromium,
  isEdge,
  isFirefox,
  isIOS,
  isMobileSafari,
  isSafari,
  osName,
  osVersion
} from 'react-device-detect'
import UneeqContext from './provider/UneeqContext'
import { compareVersionNumbers } from './utils/compareVersionNumbers'
import { useTheme } from 'emotion-theming'
import { useWindowWidth } from '@react-hook/window-size'
import { Config } from './uneeq'

var AudioContext =
  (window as any).AudioContext || (window as any).webkitAudioContext // Default // Safari and old versions of Chrome

const audioContext = new AudioContext()

export const useUneeqState = () => {
  const { state } = useContext(UneeqContext)
  return state
}

export const useUneeqSpaceToTalk = () => {
  const { startRecording, stopRecording } = useContext(UneeqContext)
  const { recording, sending } = useUneeqState()
  return { recording, sending, startRecording, stopRecording }
}

export const useUneeqDeviceList = () => {
  const { setDevice } = useContext(UneeqContext)
  const { devices, selectedDevices } = useUneeqState()
  return { devices, selectedDevices, setDevice }
}

export const useTimeout = () => {
  const { resetTimeout, endSession } = useContext(UneeqContext)
  const { timeoutOpen, timeLeft } = useUneeqState()
  return { timeoutOpen, timeLeft, resetTimeout, endSession }
}

export const getErrorLevel = (config: Config, code: any) => {
  for (const key in config.errorLevels) {
    // @ts-ignore // TODO: FIX
    if (config.errorLevels[key].includes(code)) return key
  }
  return 'error'
}
export const useUneeqError = () => {
  const { error } = useUneeqState()
  const { config } = useContext(UneeqContext)
  return useMemo(
    () => error && { ...error, level: getErrorLevel(config, error.errorCode) },
    [error, config]
  )
}

export const useTranscript = () => {
  const { transcript } = useUneeqState()
  const { config, sessionId } = useContext(UneeqContext)
  const downloadTranscript = () =>
    config.downloadPdf('transcript', transcript, sessionId)
  return { transcript, downloadTranscript }
}

export const useAvatarVolume = () => {
  const {
    volume: { watch, set }
  } = useContext(UneeqContext)

  const [volume, setState] = useState(1)
  useEffect(() => watch(setState), [watch])

  return [volume, set]
}

export const useLocalVideo = () => {
  const { localVideo } = useContext(UneeqContext)
  const ref = useRef<any>()

  useEffect(() => {
    const video = localVideo.children[0]
    ref.current.appendChild(video)
    return () => localVideo.appendChild(video)
  }, [localVideo])
  return ref
}

export const useSupportedBrowser = () => {
  const macOSHighSierraVersion = '10.13'
  const version = osVersion.toString()
  const isAppleWebKit = getUA.match('AppleWebKit')
  const isGteIOS13 = compareVersionNumbers('13', version) <= 0

  const hasSupportedBrowser = () => {
    if (isFirefox) {
      return false
    }

    const androidUser =
      isAndroid &&
      (isChromium || isChrome) &&
      compareVersionNumbers('6', version) <= 0
    const mobileiOSUser = isIOS && isMobileSafari
    const windowsUser =
      osName === 'Windows' &&
      compareVersionNumbers('10', version) <= 0 &&
      (isChromium || isChrome || isEdge)
    const macOSUser =
      osName === 'Mac OS' &&
      compareVersionNumbers(macOSHighSierraVersion, version) <= 0 &&
      (isChromium || isChrome || isSafari)

    return androidUser || mobileiOSUser || windowsUser || macOSUser
  }
  const deviceInfo = deviceDetect
  return {
    isBrowserSupported: hasSupportedBrowser(),
    deviceInfo,
    isIOS,
    isGteIOS13,
    isMobileSafari: !!isMobileSafari,
    isAppleWebKit,
    getUA,
    isSafari
  }
}

export const useVolume = (active: boolean) => {
  const [volume, setVolume] = useState(80)

  useEffect(() => {
    let processor: ScriptProcessorNode
    let microphone: MediaStreamAudioSourceNode

    if (isIOS && isMobileSafari) {
      setVolume(80)
    } else if (active) {
      const analyser = audioContext.createAnalyser()
      processor = audioContext.createScriptProcessor(2048, 1, 1)

      analyser.smoothingTimeConstant = 0.2
      analyser.fftSize = 32
      analyser.connect(processor)
      processor.connect(audioContext.destination)
      processor.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(array)
        let values = 0

        let length = array.length
        for (let i = 0; i < length; i++) {
          values += array[i]
        }

        const average = values / length
        setVolume(Math.round(average))
      }

      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        microphone = audioContext.createMediaStreamSource(stream)
        microphone.connect(analyser)
      })
    }

    return () => {
      if (processor) processor.onaudioprocess = null
      if (microphone) microphone.disconnect()
    }
  }, [active])

  return volume
}

export const useIsSmallScreen = () => {
  const theme: any = useTheme()
  const DESKTOP_BREAKPOINT = parseInt(theme?.breakpoints[3], 10)
  const width = useWindowWidth()
  return width < DESKTOP_BREAKPOINT
}
