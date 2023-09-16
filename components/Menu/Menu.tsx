import React, { useContext, useRef } from 'react'
import { Flex, Image } from 'rebass'
import { trackHandler, UneeqContext, useUneeqState } from 'uneeq-react-core'
import { ReactComponent as MenuIcon } from '../../assets/img/menu.svg'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import styles from './styles'
import { useTranslation } from 'react-i18next'

const Menu: React.FC = () => {
  const { dispatch, config } = useContext(UneeqContext)
  const { menuOpen } = useUneeqState()
  const menuArea = useRef()
  const { t } = useTranslation()

  const open = (modal: string) => () => {
    dispatch({ type: 'open' + modal, payload: true })
  }

  const openSettings = open('Settings')
  const openTranscript = open('Transcript')
  const openPrivacy = open('Privacy')
  const openMenu = open('Menu')
  const giveFeedback = open('Feedback')

  useOnClickOutside(menuArea, () => {
    if (menuOpen) {
      dispatch({ type: 'closeModal' })
    }
  })

  return (
    <Flex sx={styles.menuContainer}>
      <Image
        as={MenuIcon}
        sx={styles.menuIcon}
        data-testid="menu-icon"
        onClick={openMenu}
      />
      {menuOpen && (
        <Flex sx={styles.menuAreaContainer}>
          <Flex sx={styles.menuArea} ref={menuArea}>
            {config.sendLocalAudio && (
              // Settings doesn't work if uneeq-js didn't request access to devices
              <Flex as="a" onClick={trackHandler(openSettings, 'settings-btn')}>
                {t('Menu.settings')}
              </Flex>
            )}
            <Flex
              as="a"
              onClick={trackHandler(openTranscript, 'open-transcript-btn')}
            >
              {t('Menu.showChat')}
            </Flex>
            <Flex
              as="a"
              onClick={trackHandler(giveFeedback, 'give-feedback-btn')}
            >
              {t('Menu.giveFeedback')}
            </Flex>
            <Flex
              as="a"
              onClick={trackHandler(openPrivacy, 'open-privacy-btn')}
            >
              {t('Menu.privacy')}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default Menu
