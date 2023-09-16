import uneeqCommandReducer from './uneeqCommandReducer'
import uneeqMessageReducer from './uneeqMessageReducer'
import { closeModals, closeDialogs } from './initialState'
import { Config, UneeqState } from '../../uneeq'

export const reducer = (
  currentState: UneeqState,
  action: any,
  config: Config
) => {
  let state = { ...currentState }

  // Timeout
  // Any action other than timeoutUpdate counts as activity and resets the timeout
  if (action.type !== 'timeoutUpdate') {
    state.lastActivity = Date.now()
    state.timeLeft = config.timeout
    state.timeoutOpen = false
    state.timedOut = false
  } else {
    state.timeLeft = config.timeout - (Date.now() - state.lastActivity)
    state.timeoutOpen = state.timeLeft < config.timeoutWarning
    state.timedOut = state.timeLeft <= 0
  }

  switch (action.type) {
    case 'uneeqMessage':
      // a message from the UneeQ backend
      const message = action.payload
      if (message.uneeqMessageType === 'AvatarAnswer') {
        const answer = JSON.parse(message.answerAvatar)
        if (answer.instructions.displayHtml?.html) {
          try {
            const command = JSON.parse(answer.instructions.displayHtml.html)
            process.env.NODE_ENV !== 'test' &&
              console.info('UneeQ Command', command)
            state = uneeqCommandReducer(state, command, config)
          } catch (e) {
            console.error(
              'unexpected answer.instructions:',
              answer.instructions
            )
            console.error(e)
          }
        }
      }
      return uneeqMessageReducer(state, message, config)
    case 'approving':
      // Aproval process is starting, we can set permissionAllowed to null (unless already known)
      if (state.permissionAllowed === undefined)
        return { ...state, permissionAllowed: null }
      break
    case 'approved':
      return { ...state, permissionAllowed: true, loadingPercentage: 10 }
    case 'declined':
      return { ...state, permissionAllowed: false }
    case 'spacebarHeld':
      return { ...state, spacebarTapped: action.payload <= config.tapThreshold }
    case 'suggestedResponseSent':
      const newState = { ...state }
      if (newState.onScreenInfo.suggestedResponses)
        newState.onScreenInfo.suggestedResponses.chosenResponse = action.payload
      newState.onScreenInfo.information = undefined
      return newState
    case 'closeModal':
      return { ...state, ...closeModals }
    case 'closeDialog':
      return { ...state, ...closeDialogs }
    case 'openMenu':
      return { ...state, ...closeModals, menuOpen: action.payload }
    case 'openFeedback':
      return { ...state, ...closeModals, feedbackOpen: action.payload }
    case 'openSettings':
      return { ...state, ...closeModals, settingsOpen: action.payload }
    case 'openTranscript':
      return {
        ...state,
        ...closeModals,
        transcriptOpen: action.payload,
        transcriptHasOpened: state.transcriptHasOpened || action.payload
      }
    case 'openPrivacy':
      return { ...state, ...closeModals, privacyOpen: action.payload }
    case 'setInputMode':
      return {
        ...state,
        inputMode: action.payload,
        typeModeFromBackend: false
      }
    case 'openEscalationForm':
      return {
        ...state,
        ...closeModals,
        escalationFormOpen: action.payload
      }

    case 'openEndConfirm':
      return {
        ...state,
        ...closeModals,
        endConfirmOpen: action.payload
      }

    case 'saveInformation':
      return {
        ...state,
        savedItems: [...state.savedItems, state.onScreenInfo.information]
      }
    case 'giveFeedback':
      return {
        ...state,
        feedbackGiven: true
      }
    case 'giveContactDetails':
      return {
        ...state,
        contactDetailsGiven: true
      }
    case 'showSavedItem':
      return {
        ...state,
        selectedSavedItem: action.payload
      }
    case 'expandInformation':
      return {
        ...state,
        expandedInfo: {
          type: 'information'
        }
      }
    case 'expandSavedItem':
      return {
        ...state,
        expandedInfo: {
          type: 'savedItem'
        },
        selectedSavedItem: state.selectedSavedItem || 0
      }
    case 'collapseExpandedInfo':
      return {
        ...state,
        expandedInfo: null
      }
    case 'removeSavedItem':
      return {
        ...state,
        savedItems: state.savedItems.filter(
          (item: any, index: number) => index !== action.payload
        )
      }
    case 'closeTranscript':
      return {
        ...state,
        transcriptOpen: false
      }
    case 'skip':
      return {
        ...state,
        onScreenInfo: {
          ...state.onScreenInfo,
          suggestedResponses: state.onScreenInfo.nextSuggestedResponses,
          nextSuggestedResponses: undefined
        },
        question: null,
        avatarSpeaking: false,
        inputMode: 'speech'
      }
    case 'showUI':
      return {
        ...state,
        hiddenUI: false
      }
    case 'hideUI':
      return {
        ...state,
        hiddenUI: true
      }
    case 'resetTypeModeFromBackend':
      return {
        ...state,
        typeModeFromBackend: false
      }
    case 'openMobileInformation': {
      return {
        ...state,
        mobileInformationOpen: action.payload
      }
    }
    /**
     * Errors
     */
    case 'tokenError':
      return {
        ...state,
        error: {
          errorCode: 'TokenError',
          message: action.message
        }
      }
    case 'clearError':
      return { ...state, error: null, spacebarTapped: false, noInput: false }
    default:
      return state
  }
  return state
}

export default reducer
