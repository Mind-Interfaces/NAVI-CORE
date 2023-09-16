import { useEffect } from 'react'
import { UneeqState } from '../uneeq'

/**
 * Add/remove listeners to document for the spacebar key keydown/keyup
 * for discerning when to start/stop recording
 */

const useSpacebarToTalk = (state: UneeqState, uneeqCurrent: any) => {
  const { feedbackOpen, escalationFormOpen, ready } = state

  useEffect(() => {
    if (ready) {
      const shouldAct = (e: KeyboardEvent) =>
        e.code === 'Space' && // Must be spacebar
        !e.repeat && // Only first event, not autorepeat
        !(e.target instanceof HTMLInputElement) && // Not when typing in input box
        !feedbackOpen && // Not while feedback form is open
        !escalationFormOpen // Not while escalation form is open

      const keydown = (e: KeyboardEvent) => {
        if (shouldAct(e)) {
          uneeqCurrent.startRecording()
        }
      }

      const keyup = (e: KeyboardEvent) => {
        if (shouldAct(e)) {
          uneeqCurrent.stopRecording()
        }
      }

      document.addEventListener('keydown', keydown)
      document.addEventListener('keyup', keyup)

      // return cleanup
      return () => {
        document.removeEventListener('keydown', keydown)
        document.removeEventListener('keyup', keyup)
      }
    }
  }, [feedbackOpen, escalationFormOpen, ready, uneeqCurrent])
}

export default useSpacebarToTalk
