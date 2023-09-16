export { default as i18n } from './i18n'
export { default as DigitalHuman } from './DigitalHuman'
export { default as Feedback } from './Components/endSession/Feedback'
export { default as FatalError } from './Components/Errors/FatalError'
export { default as UnsupportedBrowser } from './Components/UnsupportedBrowser'
export { default as PasscodeOverlay } from './Components/PasscodeOverlay'

export { default as UneeqProvider } from './provider/UneeqProvider'
export { default as UneeqContext } from './provider/UneeqContext'
export { default as UneeqAvatar } from './components/UneeqAvatar'
export { default as UneeqLocalVideo } from './components/UneeqLocalVideo'

export {
  useUneeqState,
  useSupportedBrowser,
  useUneeqSpaceToTalk,
  useVolume,
  useUneeqError,
  useIsSmallScreen,
  useUneeqDeviceList,
  useLocalVideo,
  useAvatarVolume,
  useTimeout,
  useTranscript
} from './hooks'

export { trackEvent, trackHandler } from './analytics'

export { default as testState } from './utils/testState'

export type { UneeqCoreConfig } from './provider/state/initialState'
export type { Uneeq } from 'uneeq-js'
