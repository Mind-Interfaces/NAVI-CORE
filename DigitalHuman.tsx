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
import Menu from './Components/Menu'
import BottomBar from './Components/BottomBar'
import OnScreenInfo from './Components/OnScreenInfo'
import Transcript from './Components/Transcript'
import Errors from './Components/Errors'
import Settings from './Components/Settings'
import Timeout from './Components/Timeout'
import Feedback from './Components/endSession/Feedback'
import EscalationForm from './Components/endSession/EscalationForm'
import EndSessionButton from './Components/endSession/EndSessionButton'
import PrivacySummary from './Components/PrivacySummary'
import PermissionsGateway, {
  LoadingTip
} from './Components/Startup/PermissionsGateway'

import EndSessionConfirm from './Components/endSession/EndSessionConfirm'
import styles from './styles'
import { UneeqCoreConfig } from 'uneeq-react-core'

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
