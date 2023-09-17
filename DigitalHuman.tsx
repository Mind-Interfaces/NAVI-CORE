import React, { useContext } from 'react'
import {
  UneeqProvider,
  UneeqAvatar,
  UneeqLocalVideo,
  UneeqContext,
  useUneeqState,
  Uneeq
} from './'
import { Box } from 'rebass'
import Menu from './components/Menu'
import BottomBar from './components/BottomBar'
import OnScreenInfo from './components/OnScreenInfo'
import Transcript from './components/Transcript'
import Errors from './components/Errors'
import Settings from './components/Settings'
import Timeout from './components/Timeout'
import Feedback from './components/endSession/Feedback'
import EscalationForm from './components/endSession/EscalationForm'
import EndSessionButton from './components/endSession/EndSessionButton'
import PrivacySummary from './components/PrivacySummary'
import PermissionsGateway, {
  LoadingTip
} from './components/Startup/PermissionsGateway'

import EndSessionConfirm from './components/endSession/EndSessionConfirm'
import styles from './styles'

const DigitalHumanContent = ({
  restart,
  CustomFeedback,
  permissions,
  audio,
  loadingTips
}: any) => {
  const FinalFeedback = CustomFeedback || Feedback
  const { dispatch } = useContext(UneeqContext)
  const { feedbackOpen } = useUneeqState()

  return (
    <Box sx={styles.container}>
      <UneeqAvatar />

      {/* Must be present but we want it hidden */}
      <UneeqLocalVideo style={styles.localVideo} />

      <PermissionsGateway
        restart={restart}
        loadingTips={loadingTips}
        video={permissions}
      >
        <OnScreenInfo />
        <Transcript />
        <BottomBar />

        {/* Modals */}
        <Menu />
        <Settings audio={audio} />
        <Timeout />
        <PrivacySummary />
        <EndSessionConfirm restart={restart} />
        <FinalFeedback
          restart={restart}
          close={() => dispatch({ type: 'openFeedback', payload: false })}
          isOpen={feedbackOpen}
        />
        <EscalationForm restart={restart} />

        <Errors />
        <EndSessionButton />
      </PermissionsGateway>
    </Box>
  )
}

interface DigitalHumanProps {
  assets: any
  onTimedOut: () => void
  onSessionEnded: () => void
  config: Partial<UneeqCoreConfig>
  postInit?: (uneeq: Uneeq) => void
  token?: string
  restart: () => void
  loadingTips: Array<LoadingTip>
  CustomFeedback?: any
}

const DigitalHuman: React.FC<DigitalHumanProps> = ({
  assets,
  onTimedOut,
  onSessionEnded,
  restart,
  postInit,
  config,
  token,
  loadingTips,
  CustomFeedback
}) => {
  const {
    video: { permissions },
    audio
  } = assets

  return (
    <UneeqProvider
      config={config}
      token={token}
      postInit={postInit}
      onTimedOut={onTimedOut}
      onSessionEnded={onSessionEnded}
    >
      <DigitalHumanContent
        CustomFeedback={CustomFeedback}
        restart={restart}
        audio={audio}
        permissions={permissions}
        loadingTips={loadingTips}
      />
    </UneeqProvider>
  )
}

export default DigitalHuman
