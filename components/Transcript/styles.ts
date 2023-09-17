const styles = {
  container: {
    label: 'transcript-container',
    zIndex: 5,
    position: 'absolute',
    bottom: 0,
    right: [0, 0, 0, 0, 10, 10],
    height: ['100%', '100%', '100%', '100%', '85%', '85%'],
    width: ['100%', '100%', '100%', '100%', 0, 0]
  },
  transcript: {
    label: 'Transcript',
    position: 'absolute',
    flexDirection: 'column'
  },

  transcriptImage: {
    width: 23,
    height: 23
  },

  header: {
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',
    zIndex: 3,
    cursor: ['auto', 'auto', 'auto', 'auto', 'move', 'move']
  },

  headerBigScreen: {
    display: ['none', 'none', 'none', 'none', 'flex', 'flex']
  },
  headerSmallScreen: {
    display: ['flex', 'flex', 'flex', 'flex', 'none', 'none']
  },

  headerText: {
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: 25
  },

  downloadIcon: {
    cursor: 'pointer',
    width: '24px',
    height: '24px',
    mt: '10px',
    ml: '20px',
    '@media (hover: hover)': {
      '&:hover .download-tooltip': { display: 'block' }
    }
  },
  tooltip: {
    backgroundColor: 'text',
    color: 'white',
    borderRadius: '4px',
    p: '4px 8px',
    fontSize: 2,
    display: 'none',
    zIndex: 5,
    position: 'absolute'
  },
  pinButton: {
    cursor: 'pointer',
    '@media (hover: hover)': {
      '&:hover .transcript-tooltip': { display: 'block' }
    }
  },
  pinIcon: {
    width: '20px',
    ml: '6px',
    mr: '15px',
    '& svg': {
      minWidth: '24px'
    }
  },
  scrollArea: {
    flex: 1,
    overflow: 'auto',
    justifyContent: 'flex-end'
  },
  scrollContent: {
    minHeight: '100%',
    display: 'flex',
    maxWidth: '100%',
    width: '100%',
    overflowY: 'auto',
    flexDirection: 'column',
    mt: 'auto',
    '& > :first-of-type': {
      mt: 'auto !important'
    },
    '& .avatar-message + .avatar-message, & .user-message + .user-message': {
      mt: 1
    }
  },
  message: {
    mt: 3,
    backgroundColor: '#DDDDDD', // TODO Theme
    borderRadius: 'card',
    padding: 6,
    minWidth: '0%',
    maxWidth: '75%',
    ml: 'auto',
    mr: 0,
    fontSize: 12,
    lineHeight: '19px'
  },
  link: { color: '#333' },
  footer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  questionInputLabel: {
    position: 'absolute',
    left: '-10000px',
    top: 'auto',
    width: '1px',
    height: '1px',
    overflow: 'hidden'
  },
  textInput: {
    fontSize: [1, 0],
    border: 'none',
    borderRadius: [30, 0],
    width: '86%',
    height: 48,
    ml: [3, 0],
    '&::placeholder': { opacity: '0.6' },
    zIndex: 1,
    '&:focus': {
      outline: 'none'
    },
    background: ['white', 'transparent'],
    fontFamily: 'body'
  },
  sendButton: {
    cursor: 'pointer',
    width: 31,
    height: 31,
    mr: [3, 0]
  }
}

export default styles;
