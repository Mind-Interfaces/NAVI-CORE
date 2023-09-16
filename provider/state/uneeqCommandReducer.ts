import { closeDialogs, closeModals } from './initialState'
import {
  UneeqInformation,
  UneeqSuggestedResponses,
  UneeqState,
  Config
} from '../../uneeq'

export type UneeqCommand = {
  openInputBar?: boolean
  openTranscript?: boolean
  openFeedback?: boolean
  openEscalationForm?: boolean
  information?: UneeqInformation
} & UneeqSuggestedResponses

export const uneeqCommandReducer = (
  state: UneeqState,
  command: UneeqCommand,
  config: Config
) => {
  let newState = { ...state }
  if (command.openInputBar) {
    newState.inputMode = command.openInputBar ? 'text' : 'speech'
    newState.typeModeFromBackend = true
  }
  if (command.openTranscript) {
    newState = {
      ...newState,
      ...closeDialogs,
      transcriptOpen: command.openTranscript,
      transcriptHasOpened: state.transcriptHasOpened || command.openTranscript
    }
  }
  if (command.openFeedback) {
    newState = {
      ...newState,
      ...closeDialogs,
      ...closeModals,
      feedbackOpen: command.openFeedback
    }
  }
  if (command.openEscalationForm) {
    newState = {
      ...newState,
      ...closeDialogs,
      ...closeModals,
      escalationFormOpen: command.openEscalationForm,
      escalationFormFromServer: true
    }
  }
  if (command.suggestedResponses && command.suggestedResponses.length > 0) {
    // Handle old style suggestedResponses
    const suggestedResponses = command.suggestedResponses
    if (!suggestedResponses[0].utterance) {
      console.warn('suggestedResponses are in old format')
      newState.onScreenInfo.nextSuggestedResponses = {
        id: Date.now(),
        mainTitle:
          'WARNING: DEPRECATED SuggestedResponses FORMAT USED' +
          (command.mainTitle || ''),
        suggestedResponses: ((suggestedResponses as unknown) as string[]).map(
          (r: string) => ({
            utterance: r,
            label: r
          })
        )
      }
    } else {
      newState.onScreenInfo.nextSuggestedResponses = {
        id: Date.now(),
        mainTitle: command.mainTitle || '',
        suggestedResponses: command.suggestedResponses
      }
    }
  }
  if (command.information) {
    let normalizedInformation
    if (typeof command.information === 'string') {
      normalizedInformation = [
        { type: 'markdown', markdown: command.information }
      ]
    } else {
      normalizedInformation = command.information
    }
    // @ts-ignore
    newState.onScreenInfo.information = normalizedInformation
    if (config.informationInTranscript) {
      newState.transcript = [
        ...state.transcript,
        {
          information: normalizedInformation,
          user: false,
          time: new Date()
        }
      ]
    }
  } else {
    newState.onScreenInfo.information = undefined
  }
  return newState
}

export default uneeqCommandReducer
