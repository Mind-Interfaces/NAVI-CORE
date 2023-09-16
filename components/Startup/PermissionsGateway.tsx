import React, { useRef } from 'react'
import { Flex, Image, Text } from 'rebass'
import { useIsSmallScreen, useUneeqState } from 'uneeq-react-core'
import Overlay from '../generic/Overlay'
import PermissionsPrompt, { PermissionsVideo } from '../PermissionsPrompt'
import PermissionsRejected from '../PermissionsRejected'
import AvatarUnavailable from './AvatarUnavailable'
import styles from './styles'

export interface LoadingTip {
  title: string
  videoWebm?: any
  videoMP4?: any
  img?: any
  showOnDesktop: boolean
  showOnMobile: boolean
}
interface LoadingProps {
  loadingTips: Array<LoadingTip>
}

const Loading: React.FC<LoadingProps> = ({ loadingTips }) => {
  const sources = document.querySelectorAll('source')
  let checkedLoadingTips = loadingTips
  let source_errors = 0
  const addedFallback = useRef(false)
  for (let i = 0; i < sources.length; i++) {
    // eslint-disable-next-line no-loop-func
    sources[i].addEventListener('error', () => {
      source_errors++
      if (source_errors >= sources.length) fallBack()
    })
  }
  function fallBack() {
    if (addedFallback.current) return
    addedFallback.current = true
    const videoContainer = document.getElementById('videoContainer')
    const video = videoContainer!.querySelector('video') as HTMLVideoElement
    if (video) {
      video.parentElement!.removeChild(video)
    }
    const img = document.createElement('img')
    img.setAttribute('src', randomDemo.current.img)
    img.setAttribute('alt', randomDemo.current.title)
    img.setAttribute('width', '350px')
    videoContainer!.insertBefore(img, videoContainer!.firstChild)
  }
  const { loadingPercentage } = useUneeqState()
  const isSmallScreen = useIsSmallScreen()

  if (isSmallScreen) {
    checkedLoadingTips = checkedLoadingTips.filter(tip => tip.showOnMobile)
  }

  const randomDemo: any = useRef(
    checkedLoadingTips[Math.floor(Math.random() * checkedLoadingTips.length)]
  )

  return (
    <Overlay sx={{ backgroundColor: 'black' }}>
      <Flex sx={styles.loading.container}>
        <Flex
          sx={styles.loading.videoContainer}
          id="videoContainer"
          data-testid="videoContainer"
        >
          {randomDemo.current.videoMP4 && randomDemo.current.videoWebm && (
            <video
              autoPlay={true}
              loop={true}
              playsInline={true}
              controls={false}
              muted={true}
            >
              <source src={randomDemo.current.videoWebm} type="video/webm" />
              <source src={randomDemo.current.videoMP4} type="video/mp4" />
              {randomDemo.current.img && (
                <Image
                  sx={{ label: 'loadingImg', width: 350 }}
                  src={randomDemo.current.img}
                  alt={randomDemo.current.img}
                />
              )}
            </video>
          )}
          <Text sx={styles.loading.message}>{randomDemo.current.title}</Text>
          <Flex sx={styles.loading.barContainer}>
            <Flex sx={styles.loading.barInnerContainer}>
              <Flex
                sx={{
                  ...styles.loading.bar,
                  width: `${loadingPercentage * 5}px`
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Overlay>
  )
}

interface PermissionsGatewayProps {
  restart: () => void
  children: any
  loadingTips: Array<LoadingTip>
  video: PermissionsVideo
}
const PermissionsGateway: React.FC<PermissionsGatewayProps> = ({
  restart,
  children,
  loadingTips,
  video
}) => {
  const { ready, unavailable, permissionAllowed } = useUneeqState()

  return permissionAllowed === null ? (
    <PermissionsPrompt video={video} />
  ) : permissionAllowed === false ? (
    <PermissionsRejected restart={restart} />
  ) : permissionAllowed && ready ? (
    children
  ) : unavailable ? (
    <AvatarUnavailable restart={restart} />
  ) : (
    // UneeQ is not ready or
    // Permissions are completely unknown
    // They could be aproved, rejected or neither
    // Show loader for now..
    <Loading loadingTips={loadingTips} />
  )
}

export default PermissionsGateway
