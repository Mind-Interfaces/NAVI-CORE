import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import PermissionsGateway from '../PermissionsGateway'
import { useUneeqState } from 'uneeq-react-core'
import { render } from '../../../test-utils'
import translation from '../../../translations/en.json'
jest.mock('uneeq-react-core')

const loadingTips = [
  {
    title: 'Loading Tip 1',
    showOnDesktop: true,
    showOnMobile: true
  },
  {
    title: 'Loading Tip 2',
    showOnDesktop: true,
    showOnMobile: true
  },
  {
    title: 'Loading Tip 3',
    showOnDesktop: true,
    showOnMobile: true
  }
]

const video = { permissionsMP4: {}, permissionsWebm: {} }

describe('PermissionsGateway', () => {
  it('should render PermissionsPrompt when permissions not given', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      ready: false,
      unavailable: false,
      permissionAllowed: null
    })
    const test = 'test'
    const { container } = render(
      <PermissionsGateway
        video={video}
        loadingTips={loadingTips}
        restart={() => {}}
      >
        {test}
      </PermissionsGateway>
    )

    expect(container).toHaveTextContent('Loading')
  })

  it('should render PermissionsRejected when permissions rejected', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      ready: false,
      unavailable: false,
      permissionAllowed: false
    })
    const test = 'test'
    const { container } = render(
      <PermissionsGateway
        video={video}
        loadingTips={loadingTips}
        restart={() => {}}
      >
        {test}
      </PermissionsGateway>
    )

    expect(container).toHaveTextContent(
      "Looks like you've declined permissions"
    )
  })

  it('should render AvatarUnavailable when avatar not available', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      ready: false,
      unavailable: true,
      permissionAllowed: true
    })
    const test = 'test'
    const { container } = render(
      <PermissionsGateway
        video={video}
        loadingTips={loadingTips}
        restart={() => {}}
      >
        {test}
      </PermissionsGateway>
    )

    expect(container).toHaveTextContent('another call')
  })

  it('should render children when ready', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      ready: true,
      unavailable: false,
      permissionAllowed: true
    })
    const test = 'test'
    const { container } = render(
      <PermissionsGateway
        video={video}
        loadingTips={loadingTips}
        restart={() => {}}
      >
        {test}
      </PermissionsGateway>
    )

    expect(container).toHaveTextContent(test)
  })

  it('should render loading', () => {
    ;(useUneeqState as jest.Mock).mockReturnValue({
      ready: false,
      unavailable: false,
      permissionAllowed: true
    })
    const test = 'test'
    const { getByTestId } = render(
      <PermissionsGateway
        video={video}
        loadingTips={loadingTips}
        restart={() => {}}
      >
        {test}
      </PermissionsGateway>
    )

    expect(getByTestId('videoContainer')).toBeInTheDocument()
  })
})
