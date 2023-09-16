import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  useMemo
} from 'react'
import { Uneeq } from 'uneeq-js'
import { setEventHandler, trackUneeqMessage } from '../analytics'
import { useSupportedBrowser } from '../hooks'
import testState from '../utils/testState'
import defaultConfig from './defaultConfig'
import reducer from './state/reducer'
import initialState, {
  closeDialogs,
  UneeqCoreConfig
} from './state/initialState'
import UneeqContext from './UneeqContext'
import usePreApprove from './usePreApprove'
import useTimeoutUpdate from './useTimeoutUpdate'
import useSpacebarToTalk from './useSpacebarToTalk'
import { AnyUneeqMessage, UneeqState, Config } from '../uneeq'

interface UneeqProviderProps {
  children: React.ReactNode
  onSessionEnded: () => void
  onTimedOut: () => void
  postInit?: (uneeq: Uneeq) => void
  config: Partial<UneeqCoreConfig>
  token?: string
}
const UneeqProvider: React.FC<UneeqProviderProps> = ({
  children,
  onSessionEnded,
  postInit,
  onTimedOut,
  config,
  token
}) => {
  const uneeq: any = useRef() // UneeQ Instance

  const { isGteIOS13, isMobileSafari } = useSupportedBrowser()

  const finalConfig = useMemo(
    () =>
      ({
        ...defaultConfig,
        ...config,
        // in some cases we have to set sendLocalVideo to true
        sendLocalVideo: config.sendLocalVideo || (isMobileSafari && isGteIOS13)
      } as Config),
    [config, isMobileSafari, isGteIOS13]
  )

  // Elements
  const [avatarVideo, setAvatarVideo] = useState<HTMLDivElement>()
  const [localVideo, setLocalVideo] = useState<HTMLDivElement>()

  const reducerWithConfig = useCallback(
    (state: UneeqState, action: any) => {
      if (finalConfig.debug) {
        if (action.type === 'uneeqMessage') {
          // a message from the UneeQ backend
          const message = action.payload
          console.groupCollapsed(
            'Action - uneeqMessage',
            message.uneeqMessageType
          )
          console.info(message)
        } else {
          console.groupCollapsed('Action -', action.type)
        }
      }

      const newState = reducer(state, action, finalConfig)

      if (finalConfig.debug) {
        console.groupCollapsed('testState')
        console.log(newState)
        console.groupEnd()
        console.groupEnd() // end group stated inside reducer
      }

      return newState
    },
    [finalConfig]
  )
  const [state, dispatch] = useReducer(
    reducerWithConfig,
    initialState(finalConfig)
  )

  const handleUneeqMessage = (message: AnyUneeqMessage) => {
    dispatch({ type: 'uneeqMessage', payload: message })
    trackUneeqMessage(message)
  }

  // Manage permissions approval process (unless using a testState)
  usePreApprove(testState ? () => {} : dispatch, finalConfig)

  useEffect(() => {
    if (finalConfig.analytics) {
      setEventHandler(finalConfig.analytics)
    }
  }, [finalConfig.analytics])

  // put handleUneeqMessage into a ref so we can turn it into a noop prevent UneeQ-js from calling it after unmount
  const messageHandler = useRef(handleUneeqMessage)
  // init
  useEffect(() => {
    // true for quicker testing - skip connecting to backend and show UI
    if (testState) {
      uneeq.current = {
        sendTranscript: (t: string) =>
          console.info('sendTranscript called:', t),
        startRecording: () => console.info('startRecording called'),
        stopRecording: () => console.info('stopRecording  called'),
        endSession: () => console.warn('endSession called')
      }
      if (testState.ready !== false && !('permissionAllowed' in testState)) {
        dispatch({
          type: 'uneeqMessage',
          payload: {
            uneeqMessageType: 'DevicePermissionAllowed'
          }
        })
      }
      if (testState.ready !== false && !testState.unavailable) {
        dispatch({
          type: 'uneeqMessage',
          payload: {
            uneeqMessageType: 'AvatarAvailable'
          }
        })
        dispatch({
          type: 'uneeqMessage',
          payload: {
            uneeqMessageType: 'SessionLive'
          }
        })
      }
      return
    }
    // when both elements are available
    if (avatarVideo) {
      uneeq.current = new Uneeq({
        playWelcome: finalConfig.playWelcome,
        url: finalConfig.url,
        conversationId: finalConfig.conversationId,
        messageHandler: msg => messageHandler.current(msg),
        avatarVideoContainerElement: avatarVideo as HTMLDivElement,
        localVideoContainerElement: localVideo as HTMLDivElement,
        sendLocalVideo: finalConfig.sendLocalVideo,
        sendLocalAudio: finalConfig.sendLocalAudio,
        customData: finalConfig.customData,
        preferredCameraId: localStorage.getItem('videoInput') || undefined,
        preferredMicrophoneId: localStorage.getItem('audioInput') || undefined,
        preferredSpeakerId: localStorage.getItem('audioOutput') || undefined
      })

      // Fetch token
      if (token) {
        uneeq.current.initWithToken(token)
      } else {
        fetch(finalConfig.tokenUrl, {
          headers: finalConfig.orchestrationToken
            ? {
                Authorization: `Bearer ${finalConfig.orchestrationToken}`
              }
            : {}
        })
          .then(response => {
            if (response.status === 200) {
              return response.json()
            } else {
              return Promise.reject(new Error(response.statusText))
            }
          })
          .then(response => {
            const { token } = response
            uneeq.current.initWithToken(token)
          })
          .catch(error => {
            dispatch({ type: 'tokenError', message: error.message })
          })
      }
      if (postInit) postInit(uneeq.current)
      // Return cleanup
      return () => {
        // make the handler a noop so dispatch is not called after unmount
        messageHandler.current = () => {}
      }
    }
  }, [
    avatarVideo,
    finalConfig.tokenUrl,
    finalConfig.orchestrationToken,
    finalConfig.conversationId,
    finalConfig.customData,
    finalConfig.playWelcome,
    finalConfig.sendLocalVideo,
    finalConfig.url,
    isGteIOS13,
    isMobileSafari,
    localVideo,
    postInit,
    token
  ])

  const endSession = () => {
    uneeq.current.endSession()
  }

  const { sessionEnded, timedOut } = state

  useEffect(() => {
    if (timedOut) onTimedOut()
    if (sessionEnded) onSessionEnded()
  }, [onTimedOut, timedOut, onSessionEnded, sessionEnded])

  useSpacebarToTalk(state, uneeq.current)

  const speakTranscript = (transcript: any) => {
    // Sanitise transcript before speaking
    const doc = new DOMParser().parseFromString(transcript, 'text/html')
    const sanitisedTranscript = doc.body.textContent || ''
    console.log('Speaking sanitised transcript: ', sanitisedTranscript)

    const url = `${process.env.REACT_APP_UNEEQ_SPEAK_URL}/${
      uneeq.current.sessionId
    }/${encodeURIComponent(transcript)}`
    fetch(url)
      .then(response => {
        if (response.status === 200) {
          return
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      })
      .catch(error => {
        dispatch({ type: 'speakError', message: error.error })
      })
  }

  const sendText = (text: string) => uneeq.current.sendTranscript(text)
  const sendData = (data: any) => sendText(JSON.stringify(data))
  const startRecording = () => uneeq.current.startRecording()
  const stopRecording = () => uneeq.current.stopRecording()

  // dispatch `timeoutUpdate` actions as needed to keep the state updated
  const { resetTimeout } = useTimeoutUpdate(
    state,
    dispatch,
    onTimedOut,
    finalConfig.timeoutWarning
  )

  const setDevice = useCallback((deviceType, deviceId) => {
    localStorage.setItem(deviceType, deviceId)
    switch (deviceType) {
      case 'videoInput':
        uneeq.current.setCamera(deviceId)
        break
      case 'audioInput':
        uneeq.current.setMic(deviceId)
        break
      case 'audioOutput':
        uneeq.current.setSpeaker(deviceId)
        break
      default:
        console.error('unrecognised device type:', deviceType)
        break
    }
  }, [])

  const volume = {
    watch: (listener: any) => {
      const setter = () =>
        listener((avatarVideo?.children[0] as HTMLVideoElement)?.volume)
      avatarVideo?.children[0].addEventListener('volumechange', setter)
      // call now to set initial value
      setter()

      // cleanup function
      return () =>
        avatarVideo?.children[0].removeEventListener('volumechange', setter)
    },
    set: (level: number) => {
      if (avatarVideo) {
        ;(avatarVideo.children[0] as HTMLVideoElement).volume = level
      }
    }
  }

  const allDialogsClosed = () => {
    return Object.keys(closeDialogs).every(
      key =>
        state[key as keyof typeof closeDialogs] ===
        closeDialogs[key as keyof typeof closeDialogs]
    )
  }

  const context = {
    dispatch,
    setAvatarVideo,
    avatarVideo,
    setLocalVideo,
    localVideo,
    speakTranscript,
    sendText,
    sendData,
    setDevice,
    endSession,
    resetTimeout,
    volume,
    startRecording,
    stopRecording,
    config: finalConfig,
    state,
    sessionId: uneeq.current?.sessionId,
    allDialogsClosed,
    hideModal: () => dispatch({ type: 'closeModal' }),
    testMessage: (message: string) =>
      dispatch({ type: 'uneeqMessage', payload: message })
  }

  return (
    <UneeqContext.Provider value={context}>{children}</UneeqContext.Provider>
  )
}

export default UneeqProvider
