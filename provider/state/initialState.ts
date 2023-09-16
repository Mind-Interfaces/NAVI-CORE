import testState from '../../utils/testState'
import { EventHandler } from '../../analytics'

export interface UneeqCoreConfig {
  debug: boolean
  url: string
  conversationId: string
  tokenUrl: string
  orchestrationToken?: string
  usePasscode: boolean
  playWelcome: boolean
  sendLocalVideo: boolean
  customData: any
  informationInTranscript: boolean
  tapThreshold: number
  timeout: number
  timeoutWarning: number
  emptyTranscriptThreshold: number
  recaptchaSiteKey?: string
  analytics?: EventHandler
  errorLevels: {}
}

// state slice to close all modals
export const closeModals = {
  menuOpen: false,
  settingsOpen: false,
  endConfirmOpen: false,
  feedbackOpen: false,
  escalationFormOpen: false,
  escalationFormFromServer: false,
  timeoutOpen: false,
  privacyOpen: false,
  error: null
}

// state slice to close all dialogs
export const closeDialogs = {
  onScreenInfo: {},
  expandedInfo: null,
  question: null,
  transcriptOpen: false,
  noInput: false,
  error: null
}

type StateConfig = Pick<UneeqCoreConfig, 'timeout'>

export const initialState = (config: StateConfig) => ({
  ready: false,
  selectedDevices: {
    videoInput: localStorage.getItem('videoInput'),
    audioInput: localStorage.getItem('audioInput'),
    audioOutput: localStorage.getItem('audioOutput')
  },
  question: null,
  inputMode: 'speech',
  timedOut: false,
  sessionEnded: false,
  selectedSavedItem: null,
  hiddenUI: false,
  avatarSpeaking: false,
  lastActivity: Date.now(),
  timeLeft: config.timeout,
  permissionAllowed: undefined,
  transcript: [],
  transcriptHasOpened: false,
  mobileInformationOpen: false,
  feedbackGiven: false,
  contactDetailsGiven: false,
  typeModeFromBackend: false,
  savedItems: [],
  loadingPercentage: 0,
  emptyTranscriptCount: 0,
  ...closeModals,
  ...closeDialogs,
  ...(testState || {})
})

export default initialState
