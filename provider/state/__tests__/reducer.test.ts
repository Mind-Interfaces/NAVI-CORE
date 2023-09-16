import defaultConfig from '../../defaultConfig'
import { reducer } from '../reducer'
import * as uneeqCommandReducer from '../uneeqCommandReducer'
import * as uneeqMessageReducer from '../uneeqMessageReducer'
import { default as getInitialState } from '../initialState'
import {
  avatarTextInputFinished1,
  avatarTextInputFinished2
} from './__initialStates__/initialStates'
import stripSsml from '../stripSsml' // TODO Mock

const uneeqCommandReducerSpy = jest.spyOn(uneeqCommandReducer, 'default')
const uneeqMessageReducerSpy = jest.spyOn(uneeqMessageReducer, 'default')

// Make dates predictable
Date.now = jest.fn(() => 1600000000000)

const mockConfig = {
  avatarName: 'a Digital Human',
  conversationId: '00000000-0000-0000-0000-00000000000',
  customData: {},
  debug: true,
  emptyTranscriptThreshold: 3,
  errorLevels: {
    ignore: defaultConfig.errorLevels.ignore,
    warning: defaultConfig.errorLevels.warning,
    error: defaultConfig.errorLevels.error,
    fatal: defaultConfig.errorLevels.fatal
  },
  googleAnalyticsEventCategory: '',
  googleAnalyticsId: '',
  informationInTranscript: false,
  playWelcome: true,
  recaptchaSiteKey: undefined,
  usePasscode: false,
  sendLocalVideo: false,
  tapThreshold: 700,
  timeout: 300000,
  timeoutWarning: 30000,
  tokenUrl: 'http://example.com/token',
  url: 'https://example.com/'
}
const initialState = getInitialState(mockConfig)

describe('Uneeq reducer', () => {
  const getStateFromAction = (action: any, providedInitialState?: any) => {
    return reducer(providedInitialState || initialState, action, mockConfig)
  }

  it('should pass uneeqMessages to uneeqMessageReducer', () => {
    const message = { uneeqMessageType: 'MockMessage' }
    getStateFromAction({ type: 'uneeqMessage', payload: message })
    expect(uneeqMessageReducerSpy).toHaveBeenCalledWith(
      initialState,
      message,
      mockConfig
    )
  })
  it('should pass uneeqCommands to uneeqCommandReducer', () => {
    const command = { mockCommand: true }
    getStateFromAction({
      type: 'uneeqMessage',
      payload: {
        uneeqMessageType: 'AvatarAnswer',
        answerAvatar: JSON.stringify({
          instructions: {
            displayHtml: { html: JSON.stringify(command) }
          }
        })
      }
    })
    expect(uneeqCommandReducerSpy).toHaveBeenCalledWith(
      initialState,
      command,
      mockConfig
    )
  })

  describe('timeout', () => {
    it('should count down on timeoutUpdate command', () => {
      // TODO
      // state.lastActivity
      // state.timeLeft
      // state.timeoutOpen
      // state.timedOut
    })
    it('should reset for any other command', () => {
      // TODO
      // state.lastActivity
      // state.timeLeft
      // state.timeoutOpen
      // state.timedOut
    })
  })

  describe('modal & dialog actions', () => {
    it('should close the Transcript', () => {
      const resultState = getStateFromAction({
        type: 'closeTranscript'
      })

      expect(resultState).toEqual({
        ...initialState,
        transcriptOpen: false
      })
    })
  })

  describe('errors', () => {
    it('should clear errors', () => {
      const resultState = getStateFromAction(
        {
          type: 'clearError'
        },
        {
          ...initialState,
          error: { errorCode: 'ConnectionLost', message: 'Lost Connection' }
        }
      )
      expect(resultState).toEqual({
        ...initialState,
        error: null,
        spacebarTapped: false
      })
    })

    it('should show token error message', () => {
      const message = 'Token error message'
      const resultState = getStateFromAction({
        type: 'tokenError',
        message
      })
      expect(resultState).toEqual({
        ...initialState,
        error: {
          errorCode: 'TokenError',
          message
        }
      })
    })
  })
})

describe('uneeqCommandReducer', () => {
  const getStateFromCommand = (command: any, providedInitialState?: any) => {
    const action = (command as unknown) as uneeqCommandReducer.UneeqCommand
    return uneeqCommandReducer.default(
      providedInitialState || initialState,
      action,
      mockConfig
    )
  }
  it('should handle openInputBar', () => {
    const resultState = getStateFromCommand({
      openInputBar: true
    })
    expect(resultState).toEqual({
      ...initialState,
      inputMode: 'text',
      typeModeFromBackend: true
    })
  })

  it('should handle openTranscript', () => {
    const resultState = getStateFromCommand({ openTranscript: true })
    expect(resultState).toEqual({
      ...initialState,
      transcriptOpen: true,
      transcriptHasOpened: true
    })
  })

  it('should handle openFeedback', () => {
    const resultState = getStateFromCommand({ openFeedback: true })
    expect(resultState).toEqual({
      ...initialState,
      feedbackOpen: true
    })
  })

  it('should handle openEscalationForm', () => {
    const resultState = getStateFromCommand({ openEscalationForm: true })
    expect(resultState).toEqual({
      ...initialState,
      escalationFormOpen: true,
      escalationFormFromServer: true
    })
  })

  it('should handle suggestedResponses', () => {
    const suggestedResponses = {
      mainTitle: 'Call to action text: ',
      suggestedResponses: [
        {
          label: 'Suggested Response #1',
          utterance: 'suggested response 1'
        },
        {
          label: 'Suggested Response #2',
          utterance: 'suggested response 2'
        },
        {
          label: 'Suggested Response #3',
          utterance: 'suggested response 3'
        }
      ]
    }
    const resultState = getStateFromCommand(suggestedResponses)
    expect(resultState).toEqual({
      ...initialState,
      onScreenInfo: {
        ...initialState.onScreenInfo,
        nextSuggestedResponses: { ...suggestedResponses, id: 1600000000000 }
      }
    })
  })

  it('should handle information', () => {
    const information = {
      information: [
        {
          type: 'heading',
          text: 'Contact Details'
        },
        {
          type: 'text',
          text: 'For further information call'
        },
        {
          type: 'link',
          label: 'Link',
          href: 'https://example.com'
        },
        {
          type: 'list',
          items: [
            {
              type: 'link',
              label: 'Link',
              href: 'https://example.com'
            },
            {
              type: 'text',
              text: 'Children for further information call'
            }
          ]
        },
        {
          type: 'image',
          source: 'https://picsum.photos/100',
          label: 'Yep, its an image',
          width: '100%'
        }
      ]
    }
    const resultState = getStateFromCommand(information)

    expect(resultState).toEqual({
      ...initialState,
      onScreenInfo: {
        ...initialState.onScreenInfo,
        information: information.information
      }
    })
  })
})

describe('uneeqMessageReducer', () => {
  const getStateFromMessage = (message: any, providedInitialState?: any) => {
    const action = (message as unknown) as uneeqCommandReducer.UneeqCommand
    return uneeqMessageReducer.default(
      providedInitialState || initialState,
      action,
      mockConfig
    )
  }

  it('should return unchanged state for random messages', () => {
    const resultState = getStateFromMessage({
      uneeqMessageType: 'RandomError'
    })
    expect(resultState).toEqual({
      ...initialState
    })
  })

  it('should set ready on SessionLive', () => {
    const resultState = getStateFromMessage({
      uneeqMessageType: 'SessionLive'
    })
    expect(resultState).toEqual({
      ...initialState,
      ready: true,
      loadingPercentage: 100
    })
  })

  it('should handle DevicePermissionAllowed', () => {
    const resultState = getStateFromMessage({
      uneeqMessageType: 'DevicePermissionAllowed'
    })
    expect(resultState).toEqual({
      ...initialState,
      permissionAllowed: true,
      loadingPercentage: 29
    })
  })

  it('should handle end session', () => {
    const resultState = getStateFromMessage({
      uneeqMessageType: 'SessionEnded'
    })
    expect(resultState).toEqual({
      ...initialState,
      ready: false,
      sessionEnded: true
    })
  })

  it('should handle recording started', () => {
    const startDate = Date.now()
    const resultState = getStateFromMessage({
      uneeqMessageType: 'RecordingStarted'
    })
    const endDate = Date.now()
    expect(resultState).toEqual({
      ...initialState,
      recording: true,
      recordStart: Date.now()
    })
    expect(resultState.recordStart.valueOf()).toBeGreaterThanOrEqual(
      startDate.valueOf()
    )
    expect(resultState.recordStart.valueOf()).toBeLessThanOrEqual(
      endDate.valueOf()
    )
  })

  it('should handle recording stopped (good recording)', () => {
    const startDate = Date.now() - 2000
    const resultState = getStateFromMessage(
      { uneeqMessageType: 'RecordingStopped' },
      { ...initialState, recordStart: startDate }
    )
    expect(resultState).toEqual({
      ...initialState,
      recordStart: startDate,
      recording: false,
      sending: true,
      spacebarTapped: false
    })
  })

  it('should handle recording stopped (spacebar tap)', () => {
    const startDate = Date.now() - 500
    const resultState = getStateFromMessage(
      { uneeqMessageType: 'RecordingStopped' },
      { ...initialState, recordStart: startDate }
    )
    expect(resultState).toEqual({
      ...initialState,
      recordStart: startDate,
      recording: false,
      sending: false,
      spacebarTapped: true
    })
  })

  it(`should handle when avatar stops speaking (user didn't press skip)`, () => {
    const initialState = avatarTextInputFinished1
    const resultState = getStateFromMessage(
      { uneeqMessageType: 'AvatarTextInputFinished' },
      initialState
    )
    expect(resultState).toEqual({
      ...initialState,
      onScreenInfo: {
        ...initialState.onScreenInfo,
        suggestedResponses: initialState.onScreenInfo.nextSuggestedResponses,
        nextSuggestedResponses: undefined
      },
      avatarSpeaking: false,
      question: ''
    })
  })

  it(`should handle when avatar stops speaking (user pressed skip)`, () => {
    const initialState = avatarTextInputFinished2
    const resultState = getStateFromMessage(
      {
        uneeqMessageType: 'AvatarTextInputFinished'
      },
      initialState
    )
    expect(resultState).toEqual({
      ...initialState,
      onScreenInfo: {
        ...initialState.onScreenInfo,
        suggestedResponses: initialState.onScreenInfo.suggestedResponses,
        nextSuggestedResponses: undefined
      },
      avatarSpeaking: false,
      question: ''
    })
  })

  it('should update loading percentage on ClientMediaStreamUpdate', () => {
    const resultState = getStateFromMessage({
      uneeqMessageType: 'ClientMediaStreamUpdate'
    })
    expect(resultState).toEqual({
      ...initialState,
      loadingPercentage: 85
    })
  })

  it('should update loading percentage on Ready', () => {
    const resultState = getStateFromMessage({
      uneeqMessageType: 'Ready'
    })
    expect(resultState).toEqual({
      ...initialState,
      loadingPercentage: 25
    })
  })

  it('should update loading percentage on AvatarAvailable', () => {
    const resultState = getStateFromMessage({
      uneeqMessageType: 'AvatarAvailable'
    })
    expect(resultState).toEqual({
      ...initialState,
      unavailable: false,
      loadingPercentage: 68
    })
  })

  it('should return unchanged state on AvatarAnswerText', () => {
    const resultState = getStateFromMessage({
      uneeqMessageType: 'AvatarAnswerText'
    })
    expect(resultState).toEqual({
      ...initialState
    })
  })

  it('should save device ID on SetMicSuccess', () => {
    const deviceId = 'testDeviceId'
    const resultState = getStateFromMessage({
      uneeqMessageType: 'SetMicSuccess',
      deviceId
    })
    expect(resultState).toEqual({
      ...initialState,
      selectedDevices: {
        ...initialState.selectedDevices,
        audioInput: deviceId
      },
      loadingPercentage: 33
    })
  })

  it('should save device ID on SetCameraSuccess', () => {
    const deviceId = 'testDeviceId'
    const resultState = getStateFromMessage({
      uneeqMessageType: 'SetCameraSuccess',
      deviceId
    })
    expect(resultState).toEqual({
      ...initialState,
      selectedDevices: {
        ...initialState.selectedDevices,
        videoInput: deviceId
      }
    })
  })

  it('should save device ID on SetSpeakerSuccess', () => {
    const deviceId = 'testDeviceId'
    const resultState = getStateFromMessage({
      uneeqMessageType: 'SetSpeakerSuccess',
      deviceId
    })
    expect(resultState).toEqual({
      ...initialState,
      selectedDevices: {
        ...initialState.selectedDevices,
        audioOutput: deviceId
      },
      loadingPercentage: 73
    })
  })

  describe('Errors', () => {
    it('should handle error ending session', () => {
      const resultState = getStateFromMessage({
        uneeqMessageType: 'ErrorEndingSession'
      })
      expect(resultState).toEqual({
        ...initialState,
        error: {
          errorCode: 'ErrorEndingSession',
          message: 'There was an error ending your session'
        }
      })
    })

    it('should handle no input error (3 empty questions)', () => {
      const resultState = getStateFromMessage(
        {
          uneeqMessageType: 'AvatarQuestionText',
          question: ''
        },
        { ...initialState, emptyTranscriptCount: 2 }
      )
      expect(resultState).toEqual({
        ...initialState,
        noInput: true,
        emptyTranscriptCount: 3,
        question: '',
        sending: false
      })
    })

    it('should handle user question', () => {
      const question = `What's your name?`
      const resultState = getStateFromMessage({
        uneeqMessageType: 'AvatarQuestionText',
        question
      })

      expect(resultState).toEqual({
        ...initialState,
        noInput: false,
        spacebarTapped: false,
        onScreenInfo: {
          ...initialState.onScreenInfo,
          suggestedResponses: undefined
        },
        transcript: [
          {
            message: stripSsml(question),
            user: true,
            time: new Date(Date.now())
          }
        ],
        question,
        sending: false
      })
    })

    it('should handle mic activity errors', () => {
      const resultState = getStateFromMessage({
        uneeqMessageType: 'MicActivityError'
      })
      expect(resultState).toEqual({
        ...initialState,
        error: {
          errorCode: 'MicActivityError',
          message: 'Microphone Error'
        }
      })
    })

    it('should handle device not found errors', () => {
      const msg = 'Test message'
      const resultState = getStateFromMessage(
        {
          uneeqMessageType: 'DeviceNotFoundError',
          msg
        },
        { ...initialState, ready: true }
      )
      expect(resultState).toEqual({
        ...initialState,
        ready: true,
        error: {
          errorCode: 'DeviceNotFoundError',
          message: msg
        }
      })
    })

    it('should ignore device not found errors before ready', () => {
      const msg = 'Test message'
      const resultState = getStateFromMessage(
        {
          uneeqMessageType: 'DeviceNotFoundError',
          msg
        },
        { ...initialState, ready: false }
      )
      expect(resultState).toEqual({ ...initialState, ready: false })
    })

    it('should handle when the service is unavailable', () => {
      const error = {
        body: {
          message: 'Test message'
        }
      }

      const resultState = getStateFromMessage({
        uneeqMessageType: 'ServiceUnavailable',
        error
      })
      expect(resultState).toEqual({
        ...initialState,
        error: {
          errorCode: 'ServiceUnavailable',
          message: error.body.message
        }
      })
    })

    it('should handle when the avatar is unavailable', () => {
      const resultState = getStateFromMessage({
        uneeqMessageType: 'AvatarUnavailable'
      })
      expect(resultState).toEqual({
        ...initialState,
        unavailable: true
      })
    })

    it('should handle warnings', () => {
      const msg = 'Test warning message'
      const resultState = getStateFromMessage({
        uneeqMessageType: 'Warning',
        msg
      })
      expect(resultState).toEqual({
        ...initialState,
        error: { errorCode: 'warning', message: msg }
      })
    })

    it('should handle device errors', () => {
      const error = 'some device error test message'
      const resultState = getStateFromMessage({
        uneeqMessageType: 'DeviceError',
        error
      })
      expect(resultState).toEqual({
        ...initialState,
        error: { errorCode: 'DeviceError', message: error }
      })
    })

    it('should handle permissions not allowed errors', () => {
      const error = { name: 'NotAllowedError' }
      const resultState = getStateFromMessage({
        uneeqMessageType: 'DeviceError',
        error
      })
      expect(resultState).toEqual({
        ...initialState,
        permissionAllowed: false
      })
    })

    it('should return unchanged state for SessionError due to delay', () => {
      const error =
        'Conversation API Error: Conversation service took longer than expected'
      const resultState = getStateFromMessage({
        uneeqMessageType: 'SessionError',
        error
      })
      expect(resultState).toEqual({
        ...initialState
      })
    })

    it('should directly return stringified object for malformed JSON SessionError', () => {
      const error = `{'test: 12 }`
      const resultState = getStateFromMessage({
        uneeqMessageType: 'SessionError',
        error
      })
      expect(resultState).toEqual({
        ...initialState,
        error: {
          errorCode: 'SessionError',
          message: error
        }
      })
    })

    it('should ignore SessionError with level ignore', () => {
      const error = `{"errorCode": 11002, "message": "Test message" }`
      const resultState = getStateFromMessage({
        uneeqMessageType: 'SessionError',
        error
      })
      expect(resultState).toEqual({
        ...initialState
      })
    })

    it(`should returned parsed error with well-formed SessionError that doesn't have ignore level`, () => {
      const error = `{"errorCode": 4201, "message": "Test message" }`
      const resultState = getStateFromMessage({
        uneeqMessageType: 'SessionError',
        error
      })
      expect(resultState).toEqual({
        ...initialState,
        error: JSON.parse(error)
      })
    })
  })
})
