import { AnyUneeqMessage } from './uneeq'

export type EventHandler = (label: string, action?: string) => void

let eventHandler: EventHandler | undefined
export const setEventHandler = (handler: EventHandler) => {
  eventHandler = handler
}

export const trackEvent = (label: string, action?: string) => {
  if (eventHandler) {
    eventHandler(label, action)
  }
}

export const trackHandler = (
  handler: (event?: any) => void,
  label: string,
  action?: string
) => (event?: any) => {
  handler(event)
  trackEvent(label, action)
}

export const trackUneeqMessage = (message: AnyUneeqMessage) => {
  switch (message.uneeqMessageType) {
    case 'AvatarQuestionText':
      if (message.question) {
        trackEvent('asked-question', 'user-query')
      } else {
        trackEvent('asked-empty-question', 'user-query')
      }
      break
    case 'ServiceUnavailable':
      trackEvent('service-unavailable', 'state-change')
      break
    case 'AvatarUnavailable':
      trackEvent('avatar-unavailable', 'state-change')
      break
    case 'SessionLive':
      trackEvent('session-live', 'state-change')
      break
    default:
      break
  }
}
