import { getErrorLevel } from '../../hooks'
import stripSsml from './stripSsml'
import { UneeqState, AnyUneeqMessage, Config } from '../../uneeq'

export const uneeqMessageReducer = (
  state: UneeqState,
  message: AnyUneeqMessage,
  config: Config
) => {
  switch (message.uneeqMessageType) {
    case 'Ready':
      return { ...state, loadingPercentage: 25 }
    case 'AvatarQuestionText':
      try {
        // don't do anything if it's JSON
        // it's a data message, not a real user question
        JSON.parse(message.question)
        return state
      } catch {}

      state.question = message.question
      state.sending = false
      state.inputMode = 'speech'

      if (message.question) {
        // if there was a message input is not a problem
        state.spacebarTapped = false
        state.noInput = false
        // dimsiss suggestions as soon as the user replies or
        // chooses a question
        state.onScreenInfo.suggestedResponses = undefined
        // reset empty transcript count
        state.emptyTranscriptCount = 0
        // add to transcript
        state.transcript = [
          ...state.transcript,
          {
            message: stripSsml(message.question),
            user: true,
            time: new Date(Date.now())
          }
        ]
      } else {
        // increment empty transcript count
        state.emptyTranscriptCount += 1
        if (state.emptyTranscriptCount >= config.emptyTranscriptThreshold) {
          return {
            ...state,
            noInput: true
          }
        }
      }
      break
    case 'AvatarAvailable':
      return { ...state, unavailable: false, loadingPercentage: 68 }
    case 'DeviceListUpdated':
      const devices = message.devices
      const selectedDevices = { ...state.selectedDevices }

      // set each device type to default if none is selected
      for (const deviceType in devices) {
        if (
          selectedDevices[deviceType] === undefined &&
          devices[deviceType].length > 0
        ) {
          selectedDevices[deviceType] = devices[deviceType][0].deviceId
        }
      }

      return { ...state, devices, selectedDevices, loadingPercentage: 55 }
    case 'SetMicSuccess':
      return {
        ...state,
        selectedDevices: {
          ...state.selectedDevices,
          audioInput: message.deviceId
        },
        loadingPercentage: 33
      }
    case 'SetCameraSuccess':
      return {
        ...state,
        selectedDevices: {
          ...state.selectedDevices,
          videoInput: message.deviceId
        }
      }
    case 'SetSpeakerSuccess':
      return {
        ...state,
        selectedDevices: {
          ...state.selectedDevices,
          audioOutput: message.deviceId
        },
        loadingPercentage: 73
      }
    case 'SessionEnded':
      return { ...state, ready: false, sessionEnded: true }
    case 'DevicePermissionAllowed':
      return { ...state, permissionAllowed: true, loadingPercentage: 29 }
    case 'AvatarAnswer':
      // Empty answer
      if (!message.answerSpeech) {
        return state
      }

      // add to transcript
      const transcript = message.answerSpeech
        ? [
            ...state.transcript,
            {
              message: stripSsml(message.answerSpeech),
              user: false,
              time: new Date()
            }
          ]
        : state.transcript
      return {
        ...state,
        answer: message.answerSpeech,
        transcript,
        avatarSpeaking: true
      }
    case 'RecordingStarted':
      return {
        ...state,
        recording: true,
        recordStart: Date.now(),
        avatarSpeaking: false,
        inputMode: 'speech'
      }
    case 'RecordingStopped':
      const recordTime = Date.now() - (state?.recordStart || 0)
      const spacebarTapped = recordTime <= config.tapThreshold
      return {
        ...state,
        recording: false,
        sending: !spacebarTapped,
        spacebarTapped
      }
    case 'AvatarTextInputFinished':
      return {
        ...state,
        // move nextSuggestedResponses into suggestedResponses
        onScreenInfo: {
          ...state.onScreenInfo,
          suggestedResponses:
            state.onScreenInfo.nextSuggestedResponses ||
            state.onScreenInfo.suggestedResponses,
          nextSuggestedResponses: undefined
        },
        avatarSpeaking: false,
        question: ''
      }
    case 'ClientMediaStreamUpdate':
      return {
        ...state,
        loadingPercentage:
          state.loadingPercentage < 85 ? 85 : state.loadingPercentage
      }
    case 'SessionLive':
      return { ...state, ready: true, loadingPercentage: 100 }

    /**
     * Errors
     */
    case 'SessionError':
      if (
        message.error.match(
          /^Conversation API Error: Conversation service took longer/
        )
      ) {
        return state
      }
      try {
        const parsedError = JSON.parse(message.error)
        const errorLevel = getErrorLevel(config, parsedError.errorCode)
        if (errorLevel === 'ignore') {
          return { ...state }
        }
        return { ...state, error: parsedError }
      } catch {
        return {
          ...state,
          error: {
            errorCode: 'SessionError',
            message: message.error
          }
        }
      }

    case 'ErrorEndingSession':
      return {
        ...state,
        error: {
          errorCode: 'ErrorEndingSession',
          message: 'There was an error ending your session'
        }
      }
    case 'ServiceUnavailable':
      return {
        ...state,
        error: {
          errorCode: 'ServiceUnavailable',
          message: message.error.body.message
        }
      }
    case 'MicActivityError':
      return {
        ...state,
        error: {
          errorCode: 'MicActivityError',
          message: 'Microphone Error'
        }
      }
    case 'DeviceNotFoundError':
      // Your previous device selection is remembered but if that device
      // is not available oninit there will be an error message.
      // The error is not a problem in this case so we ignore it.
      if (!state.ready) return state

      return {
        ...state,
        error: { errorCode: 'DeviceNotFoundError', message: message.msg }
      }
    case 'AvatarUnavailable':
      return {
        ...state,
        unavailable: true
      }
    case 'ConnectionLost':
      return {
        ...state,
        error: { errorCode: 'ConnectionLost', message: 'Lost Connection' }
      }
    case 'Warning':
      return {
        ...state,
        error: { errorCode: 'warning', message: message.msg }
      }
    case 'DeviceError':
      if (message.error.name === 'NotAllowedError') {
        return { ...state, permissionAllowed: false }
      } else {
        return {
          ...state,
          error: { errorCode: 'DeviceError', message: message.error }
        }
      }
    default:
      break
  }
  return state
}
export default uneeqMessageReducer
