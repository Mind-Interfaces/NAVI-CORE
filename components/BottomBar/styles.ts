const styles = {
  bar: {
    label: 'bottomBar',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& div::-webkit-scrollbar': {
      display: 'none'
    },
    '& div': {
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    }
  },
  lowerBg: {
    position: 'fixed',
    visibility: ['hidden', 'hidden', 'hidden', 'hidden', 'visible', 'visible'],
    bottom: 0,
    left: 0,
    zIndex: 0,
    width: '100%',
    maxHeight: 280,
    opacity: 0.5
  },
  left: {
    flex: 1,
    p: 5,
    alignItems: 'center'
  },
  userQuestionMotionContainer: {
    label: 'userQuestionContainer',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1
  },
  motionSuggestedResponses: {
    height: 95,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  center: {
    label: 'bottomBarCenter',
    flexDirection: 'column',
    maxWidth: '100%',
    justifyContent: 'flex-end',
    width: '100%',
    zIndex: 1
  },
  mobileChatContainer: {
    display: ['flex', 'flex', 'flex', 'flex', 'none'],
    width: ['100%', '100%', '100%', '100%', 'auto', 'auto']
  },
  bigScreenChatContainer: {
    display: ['none', 'none', 'none', 'none', 'flex', 'flex'],
    width: ['100%', '100%', '100%', '100%', 'auto', 'auto']
  },
  chatAndInputToggleContainer: {
    alignItems: [
      'flex-end',
      'flex-end',
      'flex-end',
      'flex-end',
      'center',
      'center'
    ],
    width: ['100%', '100%', '100%', '100%', 'auto', 'auto']
  },
  userQuestionContainer: {
    width: 521,
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    label: 'right',
    flex: 1,
    p: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1
  },

  chatSavedItemsContainer: {
    label: 'chatSavedItemsContainer',
    position: 'absolute',
    right: 40,
    bottom: 40,
    zIndex: 6
  },
  chatBubbleContainer: {
    display: ['none', 'none', 'none', 'none', 'flex', 'flex'],
    cursor: 'pointer',
    color: 'primary',
    alignItems: 'center',
    ml: 6,
    '& svg': {
      mr: 1,
      mt: '2px'
    }
  },
  skip: {
    label: 'skip',
    width: 204,
    height: 50,
    minHeight: 50,
    mb: [2, 2, 2, 2, 0]
  },
  pttOuterContainer: {
    justifyContent: 'center',
    minHeight: [40, 40, 70, 70, 50, 50],
    width: '100%',
    mt: 4,
    mb: [0, 0, 0, 0, 4, 4]
  },
  pttContainer: {
    label: 'pttContainer',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  emptyContainer: {
    minWidth: [30, 30, 40, 40, 0, 0],
    height: [30, 30, 40, 40, 0, 0],
    mr: [10, 10, 10, 10, 0, 0]
  },
  mobileContainer: {
    width: [30, 30, 40, 40, 0, 0]
  },
  pushToTalkButton: {
    label: 'pushToTalkButton',
    cursor: 'pointer',
    borderRadius: [100, 100, 100, 100, 0, 0],
    justifyContent: 'center',
    alignItems: 'center',
    '& > svg': {
      mr: [0, 0, 0, 0, 2, 2],
      height: [24, 24, 35, 35, 'auto', 'auto'],
      width: [24, 24, 35, 35, 'auto', 'auto'],
      minWidth: [24, 24, 35, 35, 'auto', 'auto']
    },
    mx: [10, 10, 10, 10, 0, 0],
    py: [0, 0, 0, 0, 4, 4],
    backgroundClip: 'padding-box'
  },
  pushToTalkText: {
    display: ['none', 'none', 'none', 'none', 'inline-flex', 'inline-flex']
  },
  toggleInputModeButton: {
    borderRadius: [100, 100, 100, 100, 0, 0],
    color: 'primary',
    width: [30, 30, 40, 40, 203, 203],
    height: [30, 30, 40, 40, 'auto', 'auto'],
    '& svg': {
      width: [15, 15, 20, 20, 'auto', 'auto'],
      mr: [0, 0, 0, 0, 2, 2]
    },
    py: [0, 0, 0, 0, 4, 4],
    ml: [0, 0, 0, 0, 2, 2],
    mr: [10, 10, 10, 10, 0, 0],
    px: [0, 0, 0, 0, 12, 12]
  },
  inputToggleText: {
    display: ['none', 'none', 'none', 'none', 'inline-flex', 'inline-flex']
  },
  mobilePrompt: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    left: 0,
    color: 'white',
    justifyContent: 'center',
    display: ['flex', 'none'],
    fontSize: 25
  },
  talkButton: {
    label: 'talkButton',
    display: ['block', 'none'],
    borderRadius: '1000px',
    width: '71px',
    height: '71px',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'none',
    mt: -45,
    div: {
      width: '40px',
      height: '40px',
      borderRadius: '40px',
      border: '5px solid black',
      transition: 'none'
    }
  },
  chatContainer: {
    height: 50,
    width: ['100%', '100%', '100%', '100%', 310, 310],
    position: 'relative'
  },
  chatLabel: {
    position: 'absolute',
    left: '-10000px',
    top: 'auto',
    width: '1px',
    height: '1px',
    overflow: 'hidden'
  },
  chatTextInput: {
    fontFamily: 'body',
    border: 'none',
    fontSize: 2,
    pr: 14,
    borderRadius: ['none', 'none', 'none', 'button'],
    backgroundColor: 'white',
    color: 'text',
    '&::placeholder': {
      opacity: '0.6'
    },
    width: '100%'
  },
  chatSendButton: {
    color: 'primary',
    width: 37,
    height: 37,
    cursor: 'pointer',
    position: 'absolute',
    right: '7px',
    top: '7px'
  },
  toggleContainer: {
    position: 'absolute',
    right: 25,
    bottom: 37,
    display: ['none', 'flex'],
    alignItems: 'center',
    cursor: 'pointer'
  },
  exitSessionIcon: {
    position: 'fixed',
    top: 30,
    cursor: 'pointer',
    width: 24,
    display: ['block', 'none']
  }
}

export default styles
