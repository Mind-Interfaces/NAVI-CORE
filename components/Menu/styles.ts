const baseButtonProperties = {
  position: ['static', 'absolute'],
  color: ['white', 'text'],
  right: 20,
  width: ['138px', '138px', '170px'],
  maxWidth: '170px',
  justifyContent: ['flex-start', 'flex-end'],
  textAlign: ['left', 'right'],
  mt: [3, 0],
  alignItems: 'center',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '& span': {
    display: ['inline-block', 'none'],
    mr: 3
  },
  '&:hover span': {
    display: 'inline-block'
  },
  fontSize: 20
}

const styles = {
  menuContainer: {
    label: 'menuContainer',
    position: 'fixed',
    top: [6, 6, 6, 6, 32, 32],
    left: [6, 6, 40, 40, 32, 32],
    zIndex: 2,
    alignItems: 'flex-start',
    flexDirection: 'column',
    '& > svg': {
      minWidth: ['auto', 'auto', 40, 40, 'auto', 'auto']
    }
  },

  clickableBox: {
    cursor: 'pointer'
  },

  menuIcon: {
    zIndex: 2
  },

  menuAreaContainer: {
    label: 'menuAreaContainer',
    display: 'flex',
    background: 'rgba(255,255,255,0.8)',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0
  },
  menuArea: {
    position: 'absolute',
    top: 72,
    bottom: [120, 'auto', 'auto'],
    transition: 'right 0.5s ease',
    left: [15, 32],
    flexDirection: 'column',
    color: 'text',
    fontSize: [3, 3, 5, 5, 6, 6],
    lineHeight: 1.8,
    '& a': {
      cursor: 'pointer'
    },
    '& a:hover': {
      color: 'primary'
    }
  },

  settingsButton: {
    ...baseButtonProperties,
    top: ['auto', 85]
  },

  exitButton: {
    ...baseButtonProperties,
    top: ['auto', 30]
  },

  chatHistoryButton: {
    ...baseButtonProperties,
    top: ['auto', 30],
    display: ['flex', 'none']
  },

  privacyButton: {
    ...baseButtonProperties,
    top: ['auto', 30],
    mb: [3, 0],
    display: ['flex', 'none'],
    '& a': {
      color: 'currentColor',
      textDecoration: 'none'
    }
  }
}

export default styles
